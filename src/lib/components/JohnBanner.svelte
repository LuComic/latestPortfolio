<script lang="ts">
	let { cols, rows, johnName }: { cols: number; rows: number; johnName: boolean } = $props();
	import '@fontsource/poppins';
	import Led from '$lib/components/Led.svelte';
</script>

<div
	class="grid h-full w-full gap-2"
	style:grid-template-columns="repeat({cols}, minmax(0, 1fr))"
	style:grid-template-rows="repeat({rows}, minmax(0, 1fr))"
>
	{#each Array.from(Array(cols * rows).keys()) as _, i}
		{#if johnName && [41, 42, 43, 44, 55, 56, 57].includes(i)}
			<div
				class="john-text flex h-full w-full items-center justify-center rounded-full bg-white/10 text-xl text-white"
			>
				{#if i === 41}
					J
				{:else if i === 42}
					o
				{:else if i === 43}
					h
				{:else if i === 44}
					n
				{:else if i === 55}
					D
				{:else if i === 56}
					o
				{:else}
					e
				{/if}
			</div>
		{:else}
			<Led />
		{/if}
	{/each}
</div>

<style>
	.john-text {
		font-family: 'Poppins', sans-serif;
	}
</style>
