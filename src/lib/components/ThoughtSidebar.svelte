<script lang="ts">
	import { X } from '@lucide/svelte';

	let { percent }: { percent: number } = $props();
</script>

<aside class="h-full w-full border-l-2 border-dashed border-(--gray-text)">
	<nav
		class="sticky top-0 left-0 flex h-max w-full flex-col items-start justify-start gap-4 px-2 py-4"
	>
		<button
			class="flex cursor-pointer items-center justify-start gap-2 text-lg lg:text-xl 2xl:text-2xl"
		>
			<X size={22} class="transition hover:text-(--purple-text)" />
			Exit
		</button>
		<div class="relative aspect-9/12 w-full border">
			<span class="absolute left-0 z-20 h-1 w-full bg-(--purple-text)/65" style={`top: ${percent}%`}
			></span>
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-xl font-medium lg:text-2xl 2xl:text-3xl" id="links">Links</p>
			{#each [{ label: 'bazinga', href: 'ooga' }, { label: 'real', href: 'fake' }] as link (link)}
				<a
					target="_blank"
					rel="noreferrer"
					href={link.href}
					class="text-lg text-(--purple-text) transition hover:text-(--purple-hover) lg:text-xl 2xl:text-2xl"
				>
					{link.label}
				</a>
			{/each}
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-xl font-medium lg:text-2xl 2xl:text-3xl" id="links">Other thoughts</p>
			{#each [{ label: 'bazinga', href: 'ooga' }, { label: 'real', href: 'fake' }] as link (link)}
				<a
					target="_blank"
					rel="noreferrer"
					href={link.href}
					class="text-lg text-(--purple-text) transition hover:text-(--purple-hover) lg:text-xl 2xl:text-2xl"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</nav>
</aside>
