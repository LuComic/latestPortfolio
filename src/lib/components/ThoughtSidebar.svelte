<script lang="ts">
	import { page } from '$app/state';
	import { ChevronRight, CornerDownLeft, Minimize2 } from '@lucide/svelte';
	import { thoughtsExpanded } from '$lib/thoughtState.svelte';

	type ThoughtParagraph = {
		style: 'body' | 'heading' | 'subheading';
		tokens: { content: string }[];
	};

	type SidebarItem = {
		label: string;
		href: string;
		style?: 'heading' | 'subheading';
		indexLabel?: string;
	};

	let {
		percent,
		toggleThoughts,
		toggleSize,
		closeThoughts
	}: {
		percent: number;
		toggleThoughts: () => void;
		toggleSize: () => void;
		closeThoughts: () => void;
	} = $props();

	let tocOpen = $derived(thoughtsExpanded.toc);
	let linksOpen = $derived(thoughtsExpanded.links);
	let thoughtsOpen = $derived(thoughtsExpanded.others);
	let thought = $derived(page.data.thought);
	let tocItems: SidebarItem[] = $derived.by(() => {
		let headingIndex = 0;
		let subheadingIndex = 0;

		return (
			(thought?.paragraphs as ThoughtParagraph[] | undefined)
				?.map((paragraph, index) => ({ paragraph, index }))
				.filter(
					({ paragraph }) => paragraph.style === 'heading' || paragraph.style === 'subheading'
				)
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
	});
	let linkItems: SidebarItem[] = $derived(thought?.links ?? []);

	const toggleItem = (section: 'toc' | 'links' | 'thoughts') => () => {
		switch (section) {
			case 'toc':
				thoughtsExpanded.toc = !thoughtsExpanded.toc;
				break;
			case 'links':
				thoughtsExpanded.links = !thoughtsExpanded.links;
				break;
			case 'thoughts':
				thoughtsExpanded.others = !thoughtsExpanded.others;
				break;
		}
	};
</script>

{#snippet section(
	title: string,
	items: SidebarItem[],
	toggle: () => void,
	value: boolean,
	external = false,
	showIndexes = false
)}
	<div class="flex w-full flex-col gap-2">
		<button
			onclick={toggle}
			class="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-1 text-lg hover:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
			id="links"
		>
			{title}
			<ChevronRight class={`${value ? 'rotate-90' : null}`} />
		</button>
		{#if value}
			{#each items as link (link)}
				<a
					target={external ? '_blank' : undefined}
					rel={external ? 'noreferrer' : undefined}
					href={link.href}
					class={`text-(--gray-text) underline-offset-4 hover:underline  ${link.style === 'subheading' ? 'ml-6' : 'ml-2'} text-base lg:text-lg 2xl:text-xl`}
				>
					{showIndexes ? link.indexLabel : null}
					{link.label}
				</a>
			{/each}
		{/if}
	</div>
{/snippet}

<aside
	class="sticky top-0 left-0 flex h-max w-full flex-col items-center justify-between gap-4 pt-4 pr-4 text-2xl"
>
	<div class="flex w-full flex-col gap-2">
		<button
			class="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-1 text-lg hover:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
			onclick={() => toggleThoughts()}
		>
			<CornerDownLeft size={22} />
			Back
		</button>
		<button
			class="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-1 text-lg hover:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
			onclick={() => {
				toggleSize();
				closeThoughts();
			}}
		>
			<Minimize2 size={22} />
			Minimize
		</button>
	</div>
	<div class="relative h-auto min-h-10 w-full border border-(--gray-text)">
		<span class="absolute top-1 left-0 z-20 h-px w-1/3 bg-white"></span>
		<span class="absolute left-0 z-20 h-1 w-full bg-(--purple-text)/65" style={`top: ${percent}%`}
		></span>
	</div>
	<div class="flex w-full flex-col gap-2">
		{@render section('Table of contents', tocItems, toggleItem('toc'), tocOpen, false, true)}
		{@render section('Links', linkItems, toggleItem('links'), linksOpen, true)}
		{@render section(
			'Other thoughts',
			[
				{ label: 'bazinga', href: 'ooga' },
				{ label: 'real', href: 'fake' }
			],
			toggleItem('thoughts'),
			thoughtsOpen
		)}
	</div>
</aside>
