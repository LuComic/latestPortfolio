<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '@fontsource/libre-baskerville';
	import PortfolioPopUp from '$lib/components/PortfolioPopUp.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let container: HTMLDivElement;
	let scroll: number = $state(0);
	let height: number = $state(0);

	const registerScroll = () => {
		scroll = container.scrollTop;
	};

	const measure = () => {
		height = container.scrollHeight - container.clientHeight;
	};
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<PortfolioPopUp />

<div class="scrollable flex h-dvh w-screen flex-col items-center justify-center">
	<div
		class="flex h-full w-full grid-cols-5 flex-col items-start justify-start overflow-scroll px-4 pb-4 lg:grid lg:h-2/3 lg:max-w-2/3 lg:p-0"
		bind:this={container}
		onscroll={() => {
			registerScroll();
			measure();
		}}
	>
		<Sidebar />
		<div
			class="col-span-4 flex h-full w-full flex-col items-start justify-start gap-2 border-dashed border-(--gray-text) lg:border-l-2 lg:pl-4"
		>
			{#if !page.url.pathname.includes('/thoughts/')}
				<a
					href="/"
					class="name-header mb-4 w-full bg-(--background) py-4 text-2xl text-(--headings) lg:py-0 lg:text-3xl"
				>
					<h1>
						Lukas Jääger, <span class="text-(--gray-text)">Frontend Developer</span>
					</h1>
				</a>
			{:else}
				<div
					class="fixed top-0 left-0 z-20 h-1 bg-(--purple-text)/65 md:sticky"
					style={`width: ${(scroll / height) * 100}%`}
				></div>
			{/if}
			<div class="relative flex flex-col items-start justify-start gap-6">
				{@render children()}
				<div
					class="pointer-events-none sticky -bottom-4 left-0 h-30 w-full bg-linear-to-t from-(--background) to-transparent"
				></div>
			</div>
		</div>
	</div>
</div>

<style>
	.name-header {
		font-family: 'Libre Baskerville', serif;
		font-weight: 700;
	}

	.scrollable {
		scrollbar-width: thin;
		scrollbar-color: gray transparent;
	}
</style>
