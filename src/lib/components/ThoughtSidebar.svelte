<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { ChevronRight, CornerDownLeft, Minimize2 } from '@lucide/svelte';
	import {
		getOtherThoughtItems,
		getThoughtTocItems,
		measureThoughtMinimap,
		type MinimapItem,
		type SidebarItem
	} from '$lib/thoughtState.svelte';

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

	let tocOpen = $state(false);
	let linksOpen = $state(false);
	let thoughtsOpen = $state(false);
	let minimap = $state<HTMLDivElement>();
	let minimapItems: MinimapItem[] = $state([]);
	let minimapHeight = $state(48);
	let thought = $derived(page.data.thought);
	let tocItems: SidebarItem[] = $derived(getThoughtTocItems(thought?.paragraphs));
	let hasThoughtHeadings = $derived(
		tocItems.some(
			(item) => item.label.trim().toLowerCase() !== thought?.title?.trim().toLowerCase()
		)
	);
	let linkItems: SidebarItem[] = $derived(thought?.links ?? []);
	let otherThoughtItems: SidebarItem[] = $derived(
		getOtherThoughtItems(page.data.allThoughts, thought?.href)
	);

	const toggleItem = (section: 'toc' | 'links' | 'thoughts') => () => {
		switch (section) {
			case 'toc':
				tocOpen = !tocOpen;
				break;
			case 'links':
				linksOpen = !linksOpen;
				break;
			case 'thoughts':
				thoughtsOpen = !thoughtsOpen;
				break;
		}
	};

	const measureMinimap = async () => {
		const layout = await measureThoughtMinimap(minimap, tocItems, linkItems, thought?.title);
		if (!layout) return;

		minimapHeight = layout.height;
		minimapItems = layout.items;
	};

	$effect(() => {
		if (thought) {
			measureMinimap();
		}
	});

	onMount(() => {
		measureMinimap();
		window.addEventListener('resize', measureMinimap);

		const container = minimap?.closest('.overflow-scroll') as HTMLElement | null;
		const observer = new ResizeObserver(measureMinimap);
		if (container) observer.observe(container);
		if (container?.firstElementChild) observer.observe(container.firstElementChild);

		return () => {
			window.removeEventListener('resize', measureMinimap);
			observer.disconnect();
		};
	});
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
			class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 text-left text-lg hover:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
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
					class={`${link.style === 'more' ? 'text-(--purple-text) hover:text-(--purple-hover)' : 'text-(--gray-text) underline-offset-4 hover:underline'} ${link.style === 'subheading' ? 'ml-6' : 'ml-2'} text-base transition lg:text-lg 2xl:text-xl`}
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
			class="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-1 text-left text-lg hover:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
			onclick={() => toggleThoughts()}
		>
			<CornerDownLeft size={22} />
			Back
		</button>
		<button
			class="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-1 text-left text-lg hover:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
			onclick={() => {
				toggleSize();
				closeThoughts();
			}}
		>
			<Minimize2 size={22} />
			Minimize
		</button>
	</div>
	{#if hasThoughtHeadings}
		<div
			bind:this={minimap}
			class="relative w-full overflow-hidden border border-(--gray-text)"
			style={`height: ${minimapHeight}px`}
		>
			{#each minimapItems as item (item.href)}
				<a
					href={item.href}
					aria-label={`Jump to ${item.href.slice(1)}`}
					class={`${item.style === 'heading' ? 'w-1/2' : 'w-1/4'} absolute left-0 z-10 h-px bg-white transition hover:bg-(--purple-text)`}
					style={`top: clamp(0px, ${item.top}%, calc(100% - 1px))`}
				></a>
			{/each}
			<span
				class="pointer-events-none absolute left-0 z-20 h-1 w-full bg-(--purple-text)/65"
				style={`top: clamp(0px, ${percent}%, calc(100% - 0.25rem))`}
			></span>
		</div>
	{/if}
	<div class="flex w-full flex-col gap-2">
		{@render section('Table of contents', tocItems, toggleItem('toc'), tocOpen, false, true)}
		{@render section('Links', linkItems, toggleItem('links'), linksOpen, true)}
		{@render section('Other thoughts', otherThoughtItems, toggleItem('thoughts'), thoughtsOpen)}
	</div>
</aside>
