export const thoughtsExpanded = $state({
	open: false
});

type ThoughtParagraph = {
	style: 'body' | 'heading' | 'subheading';
	tokens: { content: string }[];
};

type ThoughtPreview = {
	href: string;
	title: string;
};

export type SidebarItem = {
	label: string;
	href: string;
	style?: 'heading' | 'subheading' | 'more';
	indexLabel?: string;
};

export function getThoughtTocItems(paragraphs: ThoughtParagraph[] | undefined): SidebarItem[] {
	let headingIndex = 0;
	let subheadingIndex = 0;

	return (
		paragraphs
			?.map((paragraph, index) => ({ paragraph, index }))
			.filter(({ paragraph }) => paragraph.style === 'heading' || paragraph.style === 'subheading')
			.map(({ paragraph, index }) => {
				if (paragraph.style === 'heading') {
					headingIndex += 1;
					subheadingIndex = 0;
				} else {
					subheadingIndex += 1;
				}

				return {
					label: paragraph.tokens.map((token) => token.content).join(''),
					href: `#thought-section-${index}`,
					style: paragraph.style as 'heading' | 'subheading',
					indexLabel:
						paragraph.style === 'heading'
							? `${headingIndex}.`
							: `${headingIndex}.${subheadingIndex}.`
				};
			}) ?? []
	);
}

export function getOtherThoughtItems(
	allThoughts: ThoughtPreview[] | undefined,
	currentThoughtHref: string | undefined
): SidebarItem[] {
	return [
		...(allThoughts ?? [])
			.filter((thought) => thought.href !== currentThoughtHref)
			.slice(0, 5)
			.map((thought) => ({
				label: thought.title,
				href: `/thoughts/${thought.href}`
			})),
		{ label: 'more...', href: '/thoughts', style: 'more' }
	];
}
