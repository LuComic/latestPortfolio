<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { ChevronRight } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function toTimestamp(date: string) {
		const [day, month, year] = date.split('.').map(Number);

		return new Date(year, month - 1, day).getTime();
	}

	const sortedThoughts = $derived(
		[...data.thoughts].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
	);
</script>

<SvelteSeo
	title="Thoughts | Lukas Jaager"
	description="Thoughts page for Lukas Jaager's portfolio, where are just some random written down thoughts"
	keywords="portfolio, dev, lukas, jaager, thoughts, blog"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Thoughts</h2>
<p class="text-base md:text-lg 2xl:text-xl">
	Some random and possibly unfinished thoughts I've had and felt like writing down.
</p>
<div class="flex w-full min-w-0 flex-col items-start justify-start gap-4">
	{#each sortedThoughts as thought (thought.href)}
		<a
			class="flex w-full min-w-0 flex-wrap items-start justify-start gap-x-2 gap-y-1 text-base text-(--gray-text) underline-offset-4 transition hover:underline md:text-lg 2xl:text-xl"
			href={'/thoughts/' + thought.href}
		>
			<p class="min-w-0 flex-1 basis-0 font-semibold wrap-break-word text-(--gray-text)">
				{thought.title}
			</p>
			<span
				class="ml-auto inline-flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-sm sm:flex-nowrap"
			>
				<span>{thought.date}</span>
				<span class="text-(--purple-text)/60">{thought.wordCount}</span>
			</span>
		</a>
	{/each}
</div>
