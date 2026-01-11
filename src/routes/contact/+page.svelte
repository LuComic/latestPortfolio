<script lang="ts">
	import '@fontsource/libre-baskerville';
	import { socials } from '$lib/data';
	import { Instagram, Facebook, Github } from '@lucide/svelte';
</script>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Contact</h2>
<div class="flex flex-col items-start justify-start gap-2 text-base md:text-lg 2xl:text-xl">
	{#each socials as soc (soc.id)}
		<div class="ml-4 flex items-center justify-start gap-4 transition hover:text-(--purple-text)">
			{#if soc.media === 'facebook'}
				<Facebook />
			{:else if soc.media === 'github'}
				<Github />
			{:else if soc.media === 'instagram'}
				<Instagram />
			{/if}
			<a target="_blank" href={soc.link}>{soc.media}</a>
		</div>
	{/each}
</div>
