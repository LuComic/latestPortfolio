<script lang="ts">
	import { projects } from '$lib/data';
	import AccordionItem from '$lib/components/AccordionItem.svelte';
	import SvelteSeo from 'svelte-seo';

	let preloadImages = $derived(
		projects.reduce((imgs, prj) => [...imgs, ...prj.pics], [] as string[])
	);
</script>

<svelte:head>
	{#each preloadImages as img}
		<link rel="preload" as="image" href={img} />
	{/each}
</svelte:head>

<SvelteSeo
	title="Projects | Lukas Jaager"
	description="Projects page for Lukas Jaager's portfolio describing some of his projects"
	keywords="portfolio, dev, lukas, jaager, coding"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Projects</h2>
<div class="flex w-full flex-col items-start justify-start gap-4">
	{#each projects as prj (prj.id)}
		<AccordionItem {prj} />
	{/each}
</div>
