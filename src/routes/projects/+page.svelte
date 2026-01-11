<script lang="ts">
	import { projects } from '$lib/data';
	import AccordionItem from '$lib/components/AccordionItem.svelte';
</script>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Projects</h2>
<div class="flex w-full flex-col items-start justify-start gap-4">
	{#each projects as prj (prj.id)}
		<AccordionItem {prj} />
	{/each}
</div>
