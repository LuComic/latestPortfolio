<script lang="ts">
	import { page } from '$app/state';
	import '@fontsource/libre-baskerville';
	import { fly } from 'svelte/transition';
	import { CornerDownRight, Maximize2, Menu, Minimize2, X } from '@lucide/svelte';
	import ThoughtSidebar from './ThoughtSidebar.svelte';
	import { thoughtsExpanded } from '$lib/thoughtState.svelte';

	let { percent, thoughtBigScreen }: { percent: number; thoughtBigScreen: boolean } = $props();
	let isOpen = $state(false);

	$effect(() => {
		const handleClick = () => {
			isOpen = false;
		};

		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	});

	let width = $state(0);
	let thoughts = $state(false);
	const closeThoughts = () => (thoughts = false);

	const toggleThoughts = () => (thoughts = !thoughts);
	const toggleSize = () => (thoughtsExpanded.open = !thoughtsExpanded.open);

	const expandable = $derived(width >= 1024 && page.url.pathname.includes('/thoughts/'));
</script>

<svelte:window bind:innerWidth={width} />

<!--Nav for desktop-->
{#if width >= 1024}
	{#if thoughtBigScreen && thoughts}
		<ThoughtSidebar {percent} {toggleThoughts} {toggleSize} {closeThoughts} />
	{:else}
		<nav
			class={`sticky top-0 left-0 flex h-max w-full flex-col items-center justify-between gap-4 pr-4 text-2xl font-medium ${thoughtBigScreen ? 'pt-4' : null}`}
		>
			{#if thoughtBigScreen}
				<button class="special" onclick={() => toggleThoughts()}>Open thought</button>
				<button
					class="special"
					onclick={() => {
						toggleSize();
						closeThoughts();
					}}
				>
					Minimize
				</button>
			{:else if expandable}
				<button class="special" onclick={() => (thoughtsExpanded.open = true)}>Maximize</button>
			{/if}
			<a href="/" class="w-full transition" aria-current={page.url.pathname === '/'}>About</a>
			<a
				href="/experience"
				class="w-full transition"
				aria-current={page.url.pathname === '/experience'}
			>
				Experience
			</a>
			<a
				href="/projects"
				class="w-full transition"
				aria-current={page.url.pathname === '/projects'}
			>
				Projects
			</a>
			<a href="/contact" class="w-full transition" aria-current={page.url.pathname === '/contact'}>
				Contact
			</a>
			<a
				href="/portfolio"
				class="w-full transition"
				aria-current={page.url.pathname === '/portfolio'}
			>
				For You
			</a>
			<a
				href="/thoughts"
				class="w-full transition"
				aria-current={page.url.pathname.includes('/thoughts')}
			>
				Thoughts
			</a>
		</nav>
	{/if}
{:else}
	<!--Nav for mobile-->
	<button
		class="fixed top-3 right-3 z-10 block cursor-pointer p-2"
		onclick={(e) => {
			isOpen = !isOpen;
			e.stopPropagation();
		}}
	>
		<Menu />
	</button>

	{#if isOpen}
		<nav
			class="fixed top-0 left-0 z-20 flex h-full w-2/3 flex-col items-center justify-center gap-8 border-r-2 border-dashed border-(--gray-text) bg-(--background) px-4 text-xl font-medium"
			transition:fly={{ x: '-100%', duration: 300 }}
		>
			<button class="fixed top-5 left-5" onclick={() => (isOpen = false)}>
				<X />
			</button>
			<a href="/" class="w-full transition" aria-current={page.url.pathname === '/'}>About</a>
			<a
				href="/experience"
				class="w-full transition"
				aria-current={page.url.pathname === '/experience'}>Experience</a
			>
			<a
				href="/projects"
				class="w-full transition"
				aria-current={page.url.pathname === '/projects'}
			>
				Projects
			</a>
			<a href="/contact" class="w-full transition" aria-current={page.url.pathname === '/contact'}>
				Contact
			</a>
			<a
				href="/portfolio"
				class="w-full transition"
				aria-current={page.url.pathname === '/portfolio'}
			>
				For You
			</a>
			<a
				href="/thoughts"
				class="w-full transition"
				aria-current={page.url.pathname.includes('/thoughts')}
			>
				Thoughts
			</a>
		</nav>
	{/if}
{/if}

<style>
	a[aria-current='true'] {
		font-family: 'Libre Baskerville', serif;
		text-decoration: underline;
		text-underline-offset: 6px;
		font-weight: 700;
		color: var(--headings);
	}

	.special {
		width: 100%;
		text-align: left;
	}

	a[aria-current='false'],
	.special {
		color: var(--gray-text);
	}

	a:hover,
	.special:hover {
		font-family: 'Libre Baskerville', serif;
		color: var(--headings);
	}
</style>
