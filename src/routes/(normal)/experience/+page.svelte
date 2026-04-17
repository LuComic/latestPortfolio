<script lang="ts">
	import { experience } from '$lib/data';
	import { CircleSmall } from '@lucide/svelte';
	import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo
	title="Experience | Lukas Jaager"
	description="Experience page for Lukas Jaager's portfolio, where are listed all of his experience in coding and work"
	keywords="portfolio, dev, lukas, jaager, coding"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Experience</h2>
{#each experience as exp (exp.id)}
	<div class="flex flex-col items-start justify-start gap-2 text-base md:text-lg 2xl:text-xl">
		<p class="font-semibold text-(--gray-text)">{exp.header}</p>
		{#each exp.info as inf (inf)}
			<div class="ml-4 flex items-center justify-start gap-2">
				<CircleSmall class="min-w-6" />
				<p>{inf}</p>
			</div>
		{/each}
		{#if exp.links && exp.links.length > 0}
			{#each exp.links as link (link.name)}
				<div class="ml-4 flex items-center justify-start gap-2">
					<CircleSmall class="min-w-6" />
					<a
						class="text-(--purple-text) transition hover:text-(--purple-hover)"
						target="_blank"
						href={link.link}
					>
						{link.name}
					</a>
				</div>
			{/each}
		{/if}
	</div>
{/each}
