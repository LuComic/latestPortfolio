<script lang="ts">
	import JohnBanner from '$lib/components/JohnBanner.svelte';
	import '@fontsource-variable/domine/wght.css';
	import '@fontsource/poppins';

	let screenWidth = $state(0);
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if screenWidth > 700}
	<div class="flex h-dvh flex-col p-2">
		<div class="h-2/3 shrink-0">
			<JohnBanner cols={20} rows={13} johnName={true} />
		</div>
		<div class="flex min-h-0 w-full flex-1">
			<div class="flex w-full flex-col items-start gap-2">
				<h1 class="john-text p-2 text-8xl text-white">John Doe</h1>
				<span class="john-text overall-font text-6xl text-gray-500">One cool individual</span>
			</div>
			<div class="mt-4 flex min-h-0 flex-col items-end gap-6 text-2xl text-gray-500">
				<a href="/one-portfolio-page" class="john-hover underline-offset-4 hover:underline">About</a
				>
				<a href="/one-portfolio-page" class="john-hover underline-offset-4 hover:underline"
					>Experience</a
				>
				<a href="/one-portfolio-page" class="john-hover underline-offset-4 hover:underline"
					>Education</a
				>
				<a href="/one-portfolio-page" class="john-hover underline-offset-4 hover:underline"
					>Contact</a
				>
			</div>
		</div>
	</div>
{:else}
	<div class="flex h-dvh flex-col gap-2 p-2">
		<div class="h-1/2 shrink-0">
			<JohnBanner cols={5} rows={8} johnName={false} />
		</div>
		<div class="flex shrink-0 flex-col items-start gap-2">
			<h1 class="john-text text-6xl text-white">John Doe</h1>
			<span class="john-text overall-font text-2xl text-gray-500">One cool individual</span>
		</div>
		<div
			class="overall-font mt-4 flex min-h-0 flex-1 flex-col items-start gap-6 text-2xl text-gray-500"
		>
			<a href="/one-portfolio-page" class="underline-offset-4 hover:underline">About</a>
			<a href="/one-portfolio-page" class="underline-offset-4 hover:underline">Experience</a>
			<a href="/one-portfolio-page" class="underline-offset-4 hover:underline">Education</a>
			<a href="/one-portfolio-page" class="underline-offset-4 hover:underline">Contact</a>
		</div>
	</div>
{/if}

<style>
	.john-text {
		font-family: 'Domine Variable', serif;
	}

	.overall-font {
		font-family: 'Poppins', sans-serif;
	}

	.john-hover {
		font-family: 'Poppins', sans-serif;
	}

	.john-hover:hover {
		font-family: 'Domine Variable', serif;
	}
</style>
