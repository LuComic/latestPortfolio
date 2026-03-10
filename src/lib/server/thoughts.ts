import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

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
};

export type ThoughtPreview = thoughtType & {
	title: string;
};

const thoughtsDirectory = join(process.cwd(), 'static', 'thoughts');
const linksHeadingPattern = /^##?\s+links\s*$/i;
const inlineTokenPattern = /\[([^\]]+)\]\(([^)]+)\)|<([^>\n]+)>/g;

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

function parseInlineLinks(text: string): ThoughtToken[] {
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

		paragraphs.push(parseInlineLinks(paragraphLines.join(' ')));
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

function parseThoughtMarkdown(markdown: string) {
	const lines = markdown.replace(/\r\n/g, '\n').split('\n');
	const titleLineIndex = lines.findIndex((line) => line.trim() !== '');

	if (titleLineIndex === -1) {
		return {
			title: '',
			paragraphs: [],
			links: []
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

	return {
		title,
		paragraphs: toParagraphs(bodyLines),
		links: linkLines
			.map((line) => line.trim().match(/^\[([^\]]+)\]\(([^)]+)\)$/))
			.filter((match): match is RegExpMatchArray => match !== null)
			.map((match) => ({
				label: match[1].trim(),
				href: match[2].trim()
			}))
	};
}

async function readThoughtContent(filename: string) {
	return readFile(join(thoughtsDirectory, filename), 'utf8');
}

async function parseThought(thought: thoughtType): Promise<ParsedThought> {
	const markdown = await readThoughtContent(thought.content);
	const parsed = parseThoughtMarkdown(markdown);

	return {
		...thought,
		...parsed
	};
}

export async function getThoughtPreviews(): Promise<ThoughtPreview[]> {
	return Promise.all(
		thoughts.map(async (thought) => {
			const { title } = await parseThought(thought);

			return {
				...thought,
				title
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
