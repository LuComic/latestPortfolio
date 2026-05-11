import { tick } from 'svelte';

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
	date: string;
};

export type SidebarItem = {
	label: string;
	href: string;
	style?: 'heading' | 'subheading' | 'more';
	indexLabel?: string;
};

export type MinimapItem = {
	href: string;
	style: 'heading' | 'subheading';
	top: number;
};

export function getThoughtMinimapSourceItems(
	tocItems: SidebarItem[],
	linkItems: SidebarItem[],
	thoughtTitle: string | undefined
) {
	const normalizedThoughtTitle = thoughtTitle?.trim().toLowerCase();
	const seen = new Set<string>();
	const items = [
		...tocItems
			.filter((item) => item.label.trim().toLowerCase() !== normalizedThoughtTitle)
			.map((item) => ({ href: item.href, style: item.style ?? 'heading' })),
		...(linkItems.length > 0 ? [{ href: '#links', style: 'heading' as const }] : []),
		{ href: '#other-thoughts', style: 'heading' as const }
	] as { href: string; style: 'heading' | 'subheading' }[];

	return items.filter((item) => {
		if (seen.has(item.href)) return false;
		seen.add(item.href);
		return true;
	});
}

function getThoughtMinimapLayout(
	container: HTMLElement,
	sourceItems: { href: string; style: 'heading' | 'subheading' }[]
): { height: number; items: MinimapItem[] } {
	const maxScroll = container.scrollHeight - container.clientHeight;
	const containerTop = container.getBoundingClientRect().top + container.clientTop;
	const height = Math.min(360, Math.max(48, container.scrollHeight / 18));

	if (maxScroll <= 0) {
		return { height, items: [] };
	}

	const items = sourceItems
		.map((item) => {
			const element = document.getElementById(item.href.slice(1));
			if (!element) return null;

			const elementTop = element.getBoundingClientRect().top - containerTop + container.scrollTop;

			// If the heading can never reach the top of the scroll container, showing a line for it
			// makes the indicator appear to arrive early on short thoughts.
			if (elementTop > maxScroll) return null;

			return {
				...item,
				top: Math.max(0, Math.min(100, (elementTop / maxScroll) * 100))
			};
		})
		.filter((item): item is MinimapItem => Boolean(item));

	return { height, items };
}

export async function measureThoughtMinimap(
	minimap: HTMLElement | undefined,
	tocItems: SidebarItem[],
	linkItems: SidebarItem[],
	thoughtTitle: string | undefined
): Promise<{ height: number; items: MinimapItem[] } | undefined> {
	await tick();

	const container = minimap?.closest('.overflow-scroll') as HTMLElement | null;
	if (!container) return undefined;

	return getThoughtMinimapLayout(
		container,
		getThoughtMinimapSourceItems(tocItems, linkItems, thoughtTitle)
	);
}

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

function toTimestamp(date: string) {
	const [day, month, year] = date.split('.').map(Number);

	return new Date(year, month - 1, day).getTime();
}

export function getOtherThoughtItems(
	allThoughts: ThoughtPreview[] | undefined,
	currentThoughtHref: string | undefined
): SidebarItem[] {
	return [
		...(allThoughts ?? [])
			.filter((thought) => thought.href !== currentThoughtHref)
			.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
			.slice(0, 5)
			.map((thought) => ({
				label: thought.title,
				href: `/thoughts/${thought.href}`
			})),
		{ label: 'more...', href: '/thoughts', style: 'more' }
	];
}
