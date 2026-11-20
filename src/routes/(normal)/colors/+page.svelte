<script lang="ts">
	import { colors } from '$lib/data';

	type Swatch = (typeof colors)[number][number];
	let selected = $state.raw<Swatch | null>(null);
	let hovered = $state.raw<Swatch | null>(null);
	let focused = $state.raw<Swatch | null>(null);
	let active = $derived(hovered ?? focused ?? selected);

	function labelColor(hex: string) {
		const rgb = [1, 3, 5].map((start) => {
			const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
			return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
		});
		const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
		const blackContrast = (luminance + 0.05) / 0.05;
		const whiteContrast = 1.05 / (luminance + 0.05);

		return blackContrast > whiteContrast ? '#000' : '#fff';
	}
</script>

<svelte:head>
	<title>Colors | Lukas Jääger</title>
</svelte:head>

<section class="w-full" aria-labelledby="colors-heading">
	<h2 id="colors-heading" class="text-2xl font-medium text-(--headings)">Colors</h2>

	{#each colors as palette, index (palette)}
		<ul
			class="palette mt-2 grid auto-cols-fr grid-flow-col overflow-clip pt-(--swatch-rise)"
			aria-label={`Color set ${index + 1}`}
		>
			{#each palette as color, position (color.code)}
				{@const isNeighbor = active === palette[position - 1] || active === palette[position + 1]}
				<li
					class="swatch-slot min-w-0"
					data-lift={active === color ? 'full' : isNeighbor ? 'neighbor' : undefined}
				>
					<button
						type="button"
						class="swatch relative block h-14 w-full cursor-pointer text-left focus-visible:outline-none"
						aria-label={`${color.name}, ${color.code}`}
						aria-pressed={selected === color}
						onclick={() => (selected = selected === color ? null : color)}
						onpointerenter={(event) => {
							if (event.pointerType === 'mouse') hovered = color;
						}}
						onpointerleave={() => {
							if (hovered === color) hovered = null;
						}}
						onfocus={(event) => {
							if (event.currentTarget.matches(':focus-visible')) focused = color;
						}}
						onblur={() => (focused = null)}
						style:--swatch-color={color.code}
						style:--swatch-text={labelColor(color.code)}
					>
						<span
							class="swatch-face absolute inset-x-0 top-0 px-1.5 py-2 text-(--swatch-text) motion-safe:transition-[translate] motion-safe:duration-450 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-3"
							aria-hidden="true"
						>
							<span
								class="swatch-label relative flex flex-col gap-0.5 text-xs leading-tight wrap-break-word motion-safe:transition-opacity motion-safe:duration-200 sm:text-sm"
							>
								<span class="font-medium">{color.name}</span>
								<span class="font-mono">{color.code}</span>
							</span>
						</span>
					</button>
				</li>
			{/each}
		</ul>
	{/each}
</section>

<style>
	.palette {
		--swatch-rise: 3rem;
		--swatch-radius: 1rem;
		--swatch-overlap: calc(2 * var(--swatch-radius));
	}

	.swatch-face {
		height: calc(100% + var(--swatch-rise));
		translate: 0 calc(-1 * var(--lift, 0rem));
	}

	/* Extend the paint under the next corner while keeping the button's hit area fixed. */
	.swatch-face::before {
		position: absolute;
		inset: 0 calc(-1 * var(--swatch-overlap)) 0 0;
		border-radius: var(--swatch-radius) var(--swatch-radius) 0 0;
		background: var(--swatch-color);
		pointer-events: none;
		content: '';
	}

	.swatch-slot:last-child {
		--swatch-overlap: 0rem;
	}

	.swatch-slot[data-lift='full'] {
		--lift: var(--swatch-rise);
		--label-opacity: 1;
	}

	.swatch-slot[data-lift='neighbor'] {
		--lift: calc(var(--swatch-rise) * 0.3);
	}

	.swatch-label {
		opacity: var(--label-opacity, 0);
	}

	.swatch:focus-visible .swatch-face {
		border-radius: var(--swatch-radius) var(--swatch-radius) 0 0;
		outline: 2px solid var(--swatch-text);
		outline-offset: -3px;
	}
</style>
