<script lang="ts">
	import { page } from '$app/state';
	import '@fontsource/libre-baskerville';
	import { fly } from 'svelte/transition';
	import { Menu, X } from '@lucide/svelte';
	import { stopPropagation } from 'svelte/legacy';

	let isOpen = $state(false);

	$effect(() => {
		const handleClick = () => {
			isOpen = false;
		};

		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	});
</script>

<!--Nav for desktop-->
<nav
	class="sticky top-0 left-0 hidden h-max w-full flex-col items-center justify-between gap-4 pr-4 text-2xl font-medium md:flex"
>
	<a href="/" class="w-full transition" aria-current={page.url.pathname === '/'}>About</a>
	<a href="/experience" class="w-full transition" aria-current={page.url.pathname === '/experience'}
		>Experience</a
	>
	<a href="/projects" class="w-full transition" aria-current={page.url.pathname === '/projects'}
		>Projects</a
	>
	<a href="/contact" class="w-full transition" aria-current={page.url.pathname === '/contact'}
		>Contact</a
	>
	<a href="/portfolio" class="w-full transition" aria-current={page.url.pathname === '/portfolio'}
		>For You</a
	>
</nav>

<!--Nav for mobile-->
<button
	class="fixed top-3 right-3 z-10 block p-2 md:hidden"
	onclick={(e) => {
		isOpen = true;
		e.stopPropagation();
	}}
>
	<Menu />
</button>

{#if isOpen}
	<nav
		class="fixed top-0 left-0 z-20 flex h-full w-1/2 flex-col items-center justify-center gap-8 border-r-2 border-dashed border-(--gray-text) bg-(--background) px-4 text-xl font-medium md:hidden"
		transition:fly={{ x: '-100%', duration: 300 }}
	>
		<button class="fixed top-5 left-5">
			<X />
		</button>
		<a href="/" class="w-full transition" aria-current={page.url.pathname === '/'}>About</a>
		<a
			href="/experience"
			class="w-full transition"
			aria-current={page.url.pathname === '/experience'}>Experience</a
		>
		<a href="/projects" class="w-full transition" aria-current={page.url.pathname === '/projects'}
			>Projects</a
		>
		<a href="/contact" class="w-full transition" aria-current={page.url.pathname === '/contact'}
			>Contact</a
		>
		<a href="/portfolio" class="w-full transition" aria-current={page.url.pathname === '/portfolio'}
			>For You</a
		>
	</nav>
{/if}

<style>
	a[aria-current='true'] {
		font-family: 'Libre Baskerville', serif;
		text-decoration: underline;
		text-underline-offset: 6px;
		font-weight: 700;
		color: var(--headings);
	}

	a[aria-current='false'] {
		color: var(--gray-text);
	}

	a:hover {
		font-family: 'Libre Baskerville', serif;
		color: var(--headings);
	}
</style>
