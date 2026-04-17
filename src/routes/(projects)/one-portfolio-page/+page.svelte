<script lang="ts">
	import JohnBanner from '$lib/components/JohnBanner.svelte';
	import JohnPillar from '$lib/components/JohnPillar.svelte';
	import '@fontsource-variable/domine/wght.css';
	import '@fontsource/poppins';

	let screenWidth = $state(0);
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if screenWidth > 700}
	<div class="grid h-dvh grid-cols-6">
		<div class="min-h-0">
			<JohnPillar />
		</div>
		<div class="col-span-4 flex min-h-0 w-full flex-col gap-4 overflow-y-auto p-2 text-white">
			<h3
				class={`overall-font flex items-center justify-start ${screenWidth > 900 ? 'gap-6' : 'gap-2'} rounded-full bg-white/10 px-6 py-2 ${screenWidth > 900 ? 'text-lg' : 'text-base'}`}
			>
				<a href="/one-portfolio">John Doe</a>
				<a href="/one-portfolio-page" class="john-hover text-gray-500">About</a>
				<a href="/one-portfolio-page" class="john-hover text-gray-500">Experience</a>
				<a href="/one-portfolio-page" class="john-hover text-gray-500">Education</a>
				<a href="/one-portfolio-page" class="john-hover text-gray-500">Contact</a>
			</h3>
			<h1 class="john-text mt-20 text-4xl">About</h1>
			<p class="text-xl text-gray-500">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem sapiente consequuntur ullam,
				laudantium quisquam labore quas officiis tempore quasi dolores dolorum sed sunt nostrum
				suscipit totam, nulla alias beatae accusantium saepe unde animi odit minima! Nobis minima
				minus soluta libero adipisci ipsam dolores officiis. Repudiandae expedita provident iure in
				maxime.
			</p>
		</div>
		<div class="min-h-0">
			<JohnPillar />
		</div>
	</div>
{:else}
	<div class="flex h-dvh w-full flex-col gap-4 overflow-y-auto px-4 py-2 text-white">
		<div class="h-1/3 shrink-0">
			<JohnBanner cols={5} rows={5} johnName={false} />
		</div>
		<h1 class="john-text shrink-0 text-2xl">About</h1>
		<p class="text-lg text-gray-500">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, cum! Veritatis debitis
			voluptatibus eaque eligendi. Excepturi quod quibusdam deserunt. Iusto doloremque, ad obcaecati
			pariatur aliquam impedit sapiente consequatur delectus natus consectetur, rem in cupiditate
			magnam. Blanditiis, modi sapiente. Tempore vel earum maxime laboriosam, aspernatur ex
			recusandae nemo provident molestias rem?
		</p>
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
