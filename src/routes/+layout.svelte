<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '@fontsource/libre-baskerville';
	import PortfolioPopUp from '$lib/components/PortfolioPopUp.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<PortfolioPopUp />

<div class="scrollable flex h-dvh w-screen flex-col items-center justify-center">
	<div
		class="flex h-full w-full grid-cols-5 flex-col items-start justify-start overflow-scroll px-4 pb-4 md:grid md:h-2/3 md:max-w-2/3 md:p-0"
	>
		<Sidebar />
		<div
			class="col-span-4 flex h-full w-full flex-col items-start justify-start gap-2 border-dashed border-(--gray-text) md:border-l-2 md:pl-4"
		>
			<a
				href="/"
				class="name-header mb-4 w-full bg-(--background) py-4 text-2xl text-(--headings) md:py-0 md:text-3xl"
			>
				<h1>
					Lukas Jääger, <span class="text-(--gray-text)">Frontend Developer</span>
				</h1>
			</a>
			<div class="relative flex flex-col items-start justify-start gap-6">
				{@render children()}
				<div
					class="pointer-events-none sticky bottom-0 left-0 h-30 w-full bg-linear-to-t from-(--background) to-transparent"
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
