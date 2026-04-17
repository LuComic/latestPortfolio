<script lang="ts">
	import '@fontsource/libre-baskerville';
	import { socials } from '$lib/data';
	import { Instagram, Facebook, Github } from '@lucide/svelte';
	import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo
	title="Contact | Lukas Jaager"
	description="Contact page for Lukas Jaager's portfolio, listing his contact information"
	keywords="portfolio, dev, lukas, jaager, coding"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Contact</h2>
<div class="flex flex-col items-start justify-start gap-4 text-base md:text-lg 2xl:text-xl">
	{#each socials as soc (soc.id)}
		<div class="flex items-center justify-start gap-4 transition hover:text-(--purple-text)">
			{#if soc.media === 'facebook'}
				<Facebook color="#1877F2" />
			{:else if soc.media === 'github'}
				<Github color="#6E5494" />
			{:else if soc.media === 'instagram'}
				<Instagram color="#fa7e1e" />
			{/if}
			<a target="_blank" href={soc.link}>{soc.media}</a>
		</div>
	{/each}
</div>
