<script lang="ts">
	import { fly } from 'svelte/transition';
	import { X } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let popUp = $state(true);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	{#if popUp}
		<div
			transition:fly={{ x: '100%' }}
			class="fixed right-0 bottom-0 z-20 flex w-full flex-col items-start justify-start gap-2 border-t border-dashed border-(--gray-text) bg-(--background) p-4 md:right-7 md:bottom-7 md:max-w-sm md:border"
		>
			<div class="flex w-full items-start justify-between text-(--headings)">
				<p class="name-header text-lg md:text-xl">The current project I'm working on</p>
				<button
					onclick={() => (popUp = false)}
					class="cursor-pointer transition hover:text-(--gray-text)"
				>
					<X />
				</button>
			</div>
			<span class="text-sm md:text-lg">
				<a
					href="https://www.workhal.com/en"
					target="_blank"
					class="text-(--purple-text) transition hover:text-(--purple-hover)"
				>
					workhal,
				</a>
				simplify the daily work at bars, shops, restaurants etc. Coming from my experience at Mikkeller
				Old Town.
			</span>
		</div>

		<style>
			.name-header {
				font-family: 'Safiro', serif;
				font-weight: 700;
			}
		</style>
	{/if}
{/if}
