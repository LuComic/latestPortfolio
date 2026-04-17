<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { CircleSmall } from '@lucide/svelte';
	import { portfolioList } from '$lib/data';
</script>

<SvelteSeo
	title="For You | Lukas Jaager"
	description="Providing a portfolio service as a part of Lukas Jaager's portfolio site"
	keywords="portfolio, dev, lukas, jaager, coding, service"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">
	Your
	<span class="underline decoration-(--purple-text) underline-offset-4">own</span>
	portfolio
</h2>

<p class="text-base md:text-lg 2xl:text-xl">Considering a portfolio for yourself?</p>

{#each portfolioList as port (port.id)}
	<div class="flex flex-col items-start justify-start gap-2 text-base md:text-lg 2xl:text-xl">
		<p class="font-semibold text-(--gray-text)">{port.header}</p>
		{#each port.item as listItem (listItem.info)}
			<div class="ml-4 flex items-center justify-start gap-2">
				<CircleSmall class="min-w-6" />
				<p>{listItem.info}</p>
			</div>
			{#if listItem.subInfo}
				<div class="ml-16 flex items-center justify-start gap-2">
					{listItem.subInfo}
				</div>
			{/if}
		{/each}
	</div>
{/each}

<p class="text-base md:text-lg 2xl:text-xl">
	<a href="/contact" class="text-(--purple-text) transition hover:text-(--purple-hover)">
		Contact me
	</a>
	to discuss further
</p>
