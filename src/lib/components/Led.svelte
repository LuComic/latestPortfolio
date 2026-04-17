<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { COLORS } from '../../routes/(projects)/one-portfolio/ledColors';

	// Forces a re-render on each interval so generateColor() runs again.
	let colorTick = $state(0);
	let hovered = $state(false);

	const generateColor = () => {
		colorTick;
		let colorIndex = Math.floor(Math.random() * COLORS.length);

		return COLORS[colorIndex];
	};

	onMount(() => {
		const interval = setInterval(() => {
			colorTick += 1;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div
	class={`h-full w-full rounded-full ${hovered ? generateColor().color : 'bg-white/10'}`}
	in:fade={{ duration: 200, delay: 4000 }}
	onmouseenter={() => (hovered = true)}
	onclick={() => (hovered = true)}
	aria-hidden="true"
></div>
