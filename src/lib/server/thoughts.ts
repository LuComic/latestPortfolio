import { thoughts, type thoughtType } from '$lib/data';

export type ThoughtLink = {
	label: string;
	href: string;
};

export type ThoughtToken =
	| {
			type: 'text';
			content: string;
	  }
	| {
			type: 'italic';
			content: string;
	  }
	| {
			type: 'bold';
			content: string;
	  }
	| {
			type: 'links-anchor';
			content: string;
	  }
	| {
			type: 'link';
			content: string;
			href: string;
	  };

export type ParsedThought = thoughtType & {
	title: string;
	paragraphs: ThoughtToken[][];
	links: ThoughtLink[];
	wordCount: number;
};

export type ThoughtPreview = thoughtType & {
	title: string;
	wordCount: number;
};

const linksHeadingPattern = /^##?\s+links\s*$/i;
const inlineTokenPattern = /\[([^\]]+)\]\(([^)]+)\)|<([^>\n]+)>|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*/g;
const thoughtFiles = import.meta.glob('../../../static/thoughts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function trimEmptyLines(lines: string[]) {
	let start = 0;
	let end = lines.length;

	while (start < end && lines[start].trim() === '') {
		start += 1;
	}

	while (end > start && lines[end - 1].trim() === '') {
		end -= 1;
	}

	return lines.slice(start, end);
}

function parseInlineTokens(text: string): ThoughtToken[] {
	const tokens: ThoughtToken[] = [];
	let lastIndex = 0;

	for (const match of text.matchAll(inlineTokenPattern)) {
		const matchIndex = match.index ?? 0;

		if (matchIndex > lastIndex) {
			tokens.push({
				type: 'text',
				content: text.slice(lastIndex, matchIndex)
			});
		}

		if (match[3]) {
			tokens.push({
				type: 'links-anchor',
				content: match[3].trim()
			});
		} else if (match[4]) {
			tokens.push({
				type: 'bold',
				content: match[4]
			});
		} else if (match[5]) {
			tokens.push({
				type: 'italic',
				content: match[5]
			});
		} else {
			tokens.push({
				type: 'link',
				content: match[1].trim(),
				href: match[2].trim()
			});
		}

		lastIndex = matchIndex + match[0].length;
	}

	if (lastIndex < text.length) {
		tokens.push({
			type: 'text',
			content: text.slice(lastIndex)
		});
	}

	return tokens.length > 0 ? tokens : [{ type: 'text', content: text }];
}

function toParagraphs(lines: string[]) {
	const paragraphs: ThoughtToken[][] = [];
	let paragraphLines: string[] = [];

	const pushParagraph = () => {
		if (paragraphLines.length === 0) {
			return;
		}

		paragraphs.push(parseInlineTokens(paragraphLines.join(' ')));
		paragraphLines = [];
	};

	for (const line of lines) {
		if (line.trim() === '') {
			pushParagraph();
			continue;
		}

		paragraphLines.push(line.trim());
	}

	pushParagraph();

	return paragraphs;
}

function countWords(text: string) {
	return text.match(/\S+/g)?.length ?? 0;
}

function countParagraphWords(paragraphs: ThoughtToken[][]) {
	let total = 0;

	for (const paragraph of paragraphs) {
		for (const token of paragraph) {
			total += countWords(token.content);
		}
	}

	return total;
}

function parseThoughtMarkdown(markdown: string) {
	const lines = markdown.replace(/\r\n/g, '\n').split('\n');
	const titleLineIndex = lines.findIndex((line) => line.trim() !== '');

	if (titleLineIndex === -1) {
		return {
			title: '',
			paragraphs: [],
			links: [],
			wordCount: 0
		};
	}

	const titleLine = lines[titleLineIndex].trim();
	const title = titleLine.replace(/^#\s+/, '').trim();
	const contentStartIndex = titleLineIndex + 1;
	const linksHeadingIndex = lines.findIndex(
		(line, index) => index >= contentStartIndex && linksHeadingPattern.test(line.trim())
	);

	const bodyLines = trimEmptyLines(
		linksHeadingIndex === -1
			? lines.slice(contentStartIndex)
			: lines.slice(contentStartIndex, linksHeadingIndex)
	);
	const linkLines =
		linksHeadingIndex === -1 ? [] : trimEmptyLines(lines.slice(linksHeadingIndex + 1));
	const paragraphs = toParagraphs(bodyLines);

	return {
		title,
		paragraphs,
		links: linkLines
			.map((line) => line.trim().match(/^\[([^\]]+)\]\(([^)]+)\)$/))
			.filter((match): match is RegExpMatchArray => match !== null)
			.map((match) => ({
				label: match[1].trim(),
				href: match[2].trim()
			})),
		wordCount: countParagraphWords(paragraphs)
	};
}

function readThoughtContent(filename: string) {
	const entry = Object.entries(thoughtFiles).find(([path]) => path.endsWith(`/${filename}`));

	if (!entry) {
		throw new Error(`Thought markdown file not found: ${filename}`);
	}

	return entry[1];
}

async function parseThought(thought: thoughtType): Promise<ParsedThought> {
	const markdown = readThoughtContent(thought.content);
	const parsed = parseThoughtMarkdown(markdown);

	return {
		...thought,
		...parsed
	};
}

export async function getThoughtPreviews(): Promise<ThoughtPreview[]> {
	return Promise.all(
		thoughts.map(async (thought) => {
			const { title, wordCount } = await parseThought(thought);

			return {
				...thought,
				title,
				wordCount
			};
		})
	);
}

export async function getThoughtBySlug(slug: string) {
	const thought = thoughts.find((entry) => entry.href === slug);

	if (!thought) {
		return null;
	}

	return parseThought(thought);
}
