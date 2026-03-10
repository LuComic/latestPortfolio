<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import type { PageData } from './$types';
	import { ChevronLeft } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	const thought = $derived(data.thought);
	const description = $derived(
		thought.paragraphs[0]?.map((token) => token.content).join('') ?? 'Thought by Lukas Jaager'
	);
</script>

<SvelteSeo
	title={`${thought.title} | Lukas Jaager`}
	{description}
	keywords="portfolio, dev, lukas, jaager, thoughts, blog"
/>

<div class="flex flex-col">
	<div class="my-4 flex items-center justify-start gap-2">
		<a href="/thoughts">
			<ChevronLeft size={28} class="transition hover:text-(--purple-text)" />
		</a>
		<h1 class="name-header w-full bg-(--background) text-2xl text-(--headings) lg:py-0 lg:text-3xl">
			{thought.title}
		</h1>
	</div>

	<p class="text-base text-(--gray-text) md:text-lg 2xl:text-xl">
		By Lukas Jääger - {thought.date}
	</p>
</div>

<div class="flex flex-col gap-8">
	{#each thought.paragraphs as paragraph}
		<p class="text-lg leading-relaxed md:text-xl 2xl:text-2xl">
			{#each paragraph as token}
				{#if token.type === 'link'}
					<a
						href={token.href}
						target="_blank"
						rel="noreferrer"
						class="underline decoration-(--purple-text) underline-offset-3"
					>
						{token.content}
					</a>
				{:else if token.type === 'links-anchor'}
					<a href="#links" class="underline decoration-(--purple-text) underline-offset-3">
						{token.content}
					</a>
				{:else}
					{token.content}
				{/if}
			{/each}
		</p>
	{/each}
</div>

{#if thought.links.length > 0}
	<div class="flex flex-col gap-2 text-base md:text-lg 2xl:text-xl">
		<p class="text-(--gray-text)" id="links">Links</p>
		{#each thought.links as link}
			<a
				target="_blank"
				rel="noreferrer"
				href={link.href}
				class="text-(--purple-text) transition hover:text-(--purple-hover)"
			>
				{link.label}
			</a>
		{/each}
	</div>
{/if}

<style>
	.name-header {
		font-family: 'Libre Baskerville', serif;
		font-weight: 700;
	}
</style>
