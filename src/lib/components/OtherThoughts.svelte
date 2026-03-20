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
	<div class="flex w-full flex-col gap-4">
		{#each sortedThoughts as thought (thought.href)}
			<a
				class="outer flex w-full cursor-pointer items-center justify-start gap-2 text-base text-(--gray-text) underline-offset-4 transition hover:underline md:text-lg 2xl:text-xl"
				href={'/thoughts/' + thought.href}
			>
				<p class="font-semibold text-(--gray-text)">
					{thought.title}
				</p>
				<ChevronRight />
				<span class="ml-auto text-sm">{thought.date}</span>
				<span class="text-sm text-(--purple-text)/60">{thought.wordCount}</span>
			</a>
		{/each}
	</div>
{:else}
	<p class="text-(--gray-text)">No other thoughts</p>
{/if}
