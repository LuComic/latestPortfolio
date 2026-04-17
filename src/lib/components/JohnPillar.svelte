<script lang="ts">
	import Led from '$lib/components/Led.svelte';
</script>

<div
	class="grid h-full w-full gap-2 p-2"
	style:grid-template-columns="repeat(3, minmax(0, 1fr))"
	style:grid-template-rows="repeat(20, minmax(0, 1fr))"
>
	{#each Array.from(Array(60).keys()) as _}
		<Led />
	{/each}
</div>
