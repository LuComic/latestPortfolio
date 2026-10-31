<script lang="ts">
	import { projects } from '$lib/data';
	import type { projectType } from '$lib/data';
	import SvelteSeo from 'svelte-seo';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Carousel from '$lib/components/Carousel.svelte';

	let preloadImages = $derived(
		projects.reduce((imgs, prj) => [...imgs, ...prj.pics], [] as string[])
	);

	let activeProject: projectType | null = $state(null);
</script>

<svelte:head>
	{#each preloadImages as img (img)}
		<link rel="preload" as="image" href={img} />
	{/each}
</svelte:head>

<SvelteSeo
	title="Projects | Lukas Jääger"
	description="Projects page for Lukas Jääger's portfolio describing some of his projects"
	keywords="portfolio, dev, lukas, jaager, coding"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Projects</h2>
<div class="flex w-full flex-col items-start justify-start gap-4">
	{#if activeProject}
		<button
			onclick={() => (activeProject = null)}
			class="flex w-max cursor-pointer items-center justify-start gap-1 text-base text-(--gray-text) underline-offset-4 transition hover:underline md:text-lg 2xl:text-xl"
		>
			<ChevronLeft size={20} />
			<p class="font-semibold text-(--gray-text)">Back</p>
		</button>
		<div class="flex flex-col items-start justify-start gap-4 text-base md:text-lg 2xl:text-xl">
			<p>
				{activeProject.description}
				<span class="text-(--gray-text)">{activeProject.disclaimer}</span>
			</p>
			<p>
				<span class="text-(--gray-text)">- Stack:</span>
				{#each activeProject.stack as stack, i (stack.length)}
					<span>
						{stack}
						{#if i != activeProject.stack.length - 1}
							<span class="mr-1 text-(--foreground)">,</span>
						{/if}
					</span>
				{/each}
			</p>
			{#if activeProject.siteLink}
				<a
					class="text-(--purple-text) transition hover:text-(--purple-hover)"
					target="_blank"
					href={activeProject.siteLink}
				>
					<span class="text-(--gray-text)">- Site:</span>
					{activeProject.siteLink}
				</a>
			{/if}
			<Carousel pics={activeProject.pics} />
		</div>
	{:else}
		{#each projects as prj (prj.id)}
			<button
				class="flex w-max cursor-pointer items-center justify-start gap-2 text-base text-(--gray-text) underline-offset-4 transition hover:underline md:text-lg 2xl:text-xl"
				onclick={() => (activeProject = prj)}
			>
				<p class="font-semibold text-(--gray-text)">
					{prj.name}
				</p>
				<ChevronRight size={20} />
			</button>
		{/each}
	{/if}
</div>
