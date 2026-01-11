<script lang="ts">
	import { fly } from 'svelte/transition';
	import '@fontsource/libre-baskerville';
	import { X } from '@lucide/svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let popUp = $state(true);
	let mounted = $state(false);

	$effect(() => {
		if (page.url.pathname === '/contact') {
			popUp = false;
		}

		onMount(() => (mounted = true));
	});
</script>

{#if mounted}
	{#if popUp}
		<div
			transition:fly={{ x: '100%' }}
			class="fixed right-0 bottom-0 z-10 flex w-full flex-col items-start justify-start gap-2 border-t border-dashed border-(--gray-text) p-4 md:right-5 md:bottom-5 md:max-w-sm md:border"
		>
			<div class="flex w-full items-start justify-between text-(--headings)">
				<p class="name-header text-base md:text-lg">Interested in a simple portfolio?</p>
				<button
					onclick={() => (popUp = false)}
					class="cursor-pointer transition hover:text-(--gray-text)"
				>
					<X />
				</button>
			</div>
			<span class="text-sm md:text-lg">
				<a href="/contact" class=" text-(--purple-text) transition hover:text-(--purple-hover)">
					Contact me
				</a>
				{' '}for more information
			</span>
		</div>

		<style>
			.name-header {
				font-family: 'Libre Baskerville', serif;
				font-weight: 700;
			}
		</style>
	{/if}
{/if}
