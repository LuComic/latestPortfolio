<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import type { PageData } from './$types';
	import { ChevronLeft } from '@lucide/svelte';
	import OtherThoughts from '$lib/components/OtherThoughts.svelte';

	let { data }: { data: PageData } = $props();

	const thought = $derived(data.thought);
	const wordCount = $derived(thought.wordCount);
	const description = $derived(
		thought.paragraphs[0]?.tokens
			.map((token) => token.content)
			.join('')
			.replace(/\s+/g, ' ')
			.trim() ?? 'Thought by Lukas Jaager'
	);
</script>

<SvelteSeo
	title={`${thought.title} | Lukas Jaager`}
	{description}
	keywords="portfolio, dev, lukas, jaager, thoughts, blog"
/>

<div class="flex flex-col gap-2">
	<div class="mt-4 mb-2 flex items-center justify-start gap-2 lg:mt-0">
		<a href="/thoughts">
			<ChevronLeft size={28} class="transition hover:text-(--purple-text)" />
		</a>
		<h1
			class="name-header w-full bg-(--background) text-2xl text-(--headings) lg:py-0 lg:text-3xl 2xl:text-4xl"
		>
			{thought.title}
		</h1>
	</div>

	<p class="text-base text-(--gray-text) lg:text-lg 2xl:text-xl">
		Lukas Jääger - {thought.date}
	</p>

	<span class="text-base text-(--gray-text) lg:text-lg 2xl:text-xl">
		{wordCount} words
	</span>
</div>

<div class="flex flex-col gap-6">
	{#each thought.paragraphs as paragraph (paragraph)}
		<p
			class={paragraph.style === 'heading'
				? 'text-xl font-medium lg:text-2xl 2xl:text-3xl'
				: 'text-lg leading-relaxed whitespace-pre-line lg:text-xl 2xl:text-2xl'}
		>
			{#each paragraph.tokens as token (token)}
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
				{:else if token.type === 'bold'}
					<strong>{token.content}</strong>
				{:else if token.type === 'italic'}
					<em>{token.content}</em>
				{:else}
					{token.content}
				{/if}
			{/each}
		</p>
	{/each}
</div>

{#if thought.links.length > 0}
	<div class="flex flex-col gap-2 text-xl font-medium lg:text-2xl 2xl:text-3xl">
		<p class="text-(--gray-text)" id="links">Links</p>
		{#each thought.links as link (link)}
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

<h2 class="mt-4 text-xl font-medium text-(--headings) lg:text-2xl 2xl:text-3xl">Other thoughts</h2>
<OtherThoughts thoughts={data.allThoughts} currentThought={data.thought} />

<style>
	.name-header {
		font-family: 'Libre Baskerville', serif;
		font-weight: 700;
	}
</style>
