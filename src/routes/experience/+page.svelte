<script lang="ts">
	import '@fontsource/libre-baskerville';
	import { experiences } from '$lib/data';
	import { CircleSmall } from '@lucide/svelte';
</script>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">Experiences</h2>
{#each experiences as exp (exp.id)}
	<div class="flex flex-col items-start justify-start gap-2 text-base md:text-lg 2xl:text-xl">
		<p class="font-semibold text-(--gray-text)">{exp.header}</p>
		{#each exp.info as inf (inf.length)}
			<div class="ml-4 flex items-center justify-start gap-2">
				<CircleSmall />
				<p>{inf}</p>
			</div>
		{/each}
		{#if exp.links && exp.links.length > 0}
			{#each exp.links as link (link.name.length)}
				<div class="ml-4 flex items-center justify-start gap-2">
					<CircleSmall />
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
