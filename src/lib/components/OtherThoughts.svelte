<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import type { ThoughtPreview } from '$lib/server/thoughts';
	import type { thoughtType } from '$lib/data';
	let { thoughts, currentThought }: { thoughts: ThoughtPreview[]; currentThought: thoughtType } =
		$props();

	function toTimestamp(date: string) {
		const [day, month, year] = date.split('.').map(Number);

		return new Date(year, month - 1, day).getTime();
	}

	const filteredThoughts = $derived(thoughts.filter((t) => t.href !== currentThought.href));

	const sortedThoughts = $derived(
		[...filteredThoughts].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
	);
</script>

{#if sortedThoughts && sortedThoughts.length > 0}
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
{:else}
	<p class="text-(--gray-text)">No other thoughts</p>
{/if}
