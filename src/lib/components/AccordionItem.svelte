<script lang="ts">
	import type { projectType } from '$lib/data';
	import { ChevronRight } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import '@fontsource/libre-baskerville';

	let { prj }: { prj: projectType } = $props();

	let isOpen = $state(false);
</script>

<div class="flex w-full flex-col items-start justify-start text-base md:text-lg 2xl:text-xl">
	<button
		onclick={() => (isOpen = !isOpen)}
		class="flex w-max cursor-pointer items-center justify-start gap-4 text-(--gray-text) underline-offset-4 transition hover:underline"
	>
		<p class="font-semibold text-(--gray-text)">
			{prj.name}
		</p>
		<ChevronRight class={`${isOpen ? 'rotate-90' : 'rotate-0'} transition`} />
	</button>
	{#if isOpen}
		<div class="my-2 flex flex-col gap-4 text-base md:flex-row 2xl:text-lg">
			<div class="flex flex-col items-start justify-start gap-2">
				<p>{prj.description}</p>
				<div class="flex items-center justify-start gap-2">
					{#each prj.stack as stack (stack.length)}
						<span
							class="border border-dashed border-(--gray-text) px-1.5 py-1 text-(--purple-text)"
						>
							{stack}
						</span>
					{/each}
				</div>
				{#if prj.disclaimer}
					<p>*{prj.disclaimer}*</p>
				{/if}
			</div>
			<Carousel pics={prj.pics} />
		</div>
	{/if}
</div>
