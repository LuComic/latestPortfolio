<script lang="ts">
	import { ChevronRight, CornerDownLeft, Minimize2 } from '@lucide/svelte';
	import { thoughtsExpanded } from '$lib/thoughtState.svelte';

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
	items: { label: string; href: string }[],
	toggle: () => void,
	value: boolean
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
					target="_blank"
					rel="noreferrer"
					href={link.href}
					class="ml-2 text-lg text-(--purple-text) transition hover:text-(--purple-hover) lg:text-xl 2xl:text-2xl"
				>
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
	<div class="relative aspect-9/12 w-full border">
		<span class="absolute left-0 z-20 h-1 w-full bg-(--purple-text)/65" style={`top: ${percent}%`}
		></span>
	</div>
	<div class="flex w-full flex-col gap-2">
		{@render section(
			'Table of contents',
			[
				{ label: 'bazinga', href: 'ooga' },
				{ label: 'real', href: 'fake' }
			],
			toggleItem('toc'),
			tocOpen
		)}
		{@render section(
			'Links',
			[
				{ label: 'bazinga', href: 'ooga' },
				{ label: 'real', href: 'fake' }
			],
			toggleItem('links'),
			linksOpen
		)}
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
