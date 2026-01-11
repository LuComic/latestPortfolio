<script lang="ts">
	let { pics }: { pics: string[] } = $props();
	import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from '@lucide/svelte';

	let imageCounter = $state(0);
	let fullScreen = $state(false);

	$effect(() => {
		if (fullScreen) {
			document.body.style.overflow = 'hidden';

			const handleKeyDown = (e: any) => {
				switch (e.key) {
					case 'Escape':
						fullScreen = false;
						break;
					case 'ArrowLeft':
						handlePrevPic();
						break;
					case 'ArrowRight':
						handleNextPic();
						break;
				}
			};

			document.addEventListener('keydown', handleKeyDown);

			return () => removeEventListener('keydown', handleKeyDown);
		}
	});

	// [0, 1, 2] => 3
	const handleNextPic = () => {
		if (imageCounter !== pics.length - 1) {
			imageCounter++;
		} else {
			imageCounter = 0;
		}
	};

	const handlePrevPic = () => {
		if (imageCounter !== 0) {
			imageCounter = imageCounter - 1;
		} else {
			imageCounter = pics.length - 1;
		}
	};
</script>

<!--Move back and forth toggle snippet-->
{#snippet moveButtons(small: boolean)}
	<div class="mt-2 flex items-center justify-center gap-2">
		<button
			class="transiton cursor-pointer outline-none select-none hover:text-(--purple-text)"
			onclick={handlePrevPic}
		>
			<ChevronLeft />
		</button>
		<button
			class="transiton cursor-pointer outline-none select-none hover:text-(--purple-text)"
			onclick={handleNextPic}
		>
			<ChevronRight />
		</button>
		{#if small}
			<button
				class="transiton cursor-pointer outline-none select-none hover:text-(--purple-text)"
				onclick={() => (fullScreen = true)}
			>
				<Maximize />
			</button>
		{:else}
			<button
				class="transiton cursor-pointer outline-none select-none hover:text-(--purple-text)"
				onclick={() => (fullScreen = false)}
			>
				<Minimize />
			</button>
		{/if}
	</div>
{/snippet}

<!--Fullscreen image-->
{#if fullScreen}
	<div
		class="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/60 px-2"
	>
		<button
			class="fixed top-5 right-5 cursor-pointer text-(--headings) transition hover:text-(--gray-text)"
			onclick={() => (fullScreen = false)}
		>
			<X />
		</button>
		<div class="flex flex-col items-center justify-center gap-2">
			<img
				src={pics[imageCounter]}
				alt="project pic"
				class="aspect-video h-auto w-full object-contain md:w-3/4"
			/>
			{@render moveButtons(false)}
		</div>
	</div>
{/if}

<div class="h-auto w-full flex-col items-center justify-center md:w-1/2 md:max-w-1/2 md:min-w-1/2">
	<button onclick={() => (fullScreen = true)} class="outline-none select-none">
		<img
			src={pics[imageCounter]}
			alt="project pic"
			class="aspect-video h-auto w-full cursor-pointer object-contain"
		/>
	</button>
	{@render moveButtons(true)}
</div>
