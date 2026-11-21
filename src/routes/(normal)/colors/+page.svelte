<script lang="ts">
	import { colors } from '$lib/data';
	import ColorTuning from './ColorTuning.svelte';
	import { labelColor } from './color';

	const sections = [
		{ id: 'saved', name: 'My colors' },
		{ id: 'tuning', name: 'Color tuning' }
	];
	let selectedSection = $state('saved');

	function moveTab(event: KeyboardEvent, index: number) {
		let next: number;
		switch (event.key) {
			case 'ArrowLeft':
				next = (index + sections.length - 1) % sections.length;
				break;
			case 'ArrowRight':
				next = (index + 1) % sections.length;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = sections.length - 1;
				break;
			default:
				return;
		}
		event.preventDefault();
		selectedSection = sections[next].id;
		document.getElementById(`colors-tab-${selectedSection}`)?.focus();
	}

	type Swatch = (typeof colors)[number][number];
	let selected = $state.raw<Swatch | null>(null);
	let readyToClose = $state(false);
	let hovered = $state.raw<Swatch | null>(null);
	let focused = $state.raw<Swatch | null>(null);
	let active = $derived(hovered ?? focused ?? selected);
	let copyPressed = $state.raw<Swatch | null>(null);
	let clipboardStatus = $state('');

	async function activateSwatch(color: Swatch, event: MouseEvent) {
		const isTouch = 'pointerType' in event && event.pointerType === 'touch';
		const isHoverClick = !isTouch && event.detail > 0 && hovered === color;
		const shouldCopy =
			isHoverClick || selected === color || (!isTouch && event.detail === 0 && active === color);
		if (!isHoverClick) {
			hovered = null;
			if (selected === color && readyToClose) {
				selected = null;
				focused = null;
				readyToClose = false;
				clipboardStatus = '';
				return;
			}
			readyToClose = false;
			selected = color;
		}
		clipboardStatus = '';

		if (!shouldCopy) return;

		try {
			await navigator.clipboard.writeText(color.code);
			if (!isHoverClick && selected === color) readyToClose = true;
			clipboardStatus = `Copied ${color.code} to clipboard.`;
		} catch {
			clipboardStatus = `Could not copy ${color.code} to clipboard.`;
		}
	}
</script>

<svelte:head>
	<title>Colors | Lukas Jääger</title>
</svelte:head>

<div class="flex flex-wrap gap-2" role="tablist" aria-label="Colors">
	{#each sections as section, index (section.id)}
		<button
			type="button"
			role="tab"
			id={`colors-tab-${section.id}`}
			aria-selected={selectedSection === section.id}
			aria-controls={`colors-panel-${section.id}`}
			tabindex={selectedSection === section.id ? 0 : -1}
			class="cursor-pointer rounded-lg px-2 py-1 text-left text-lg hover:bg-(--gray-text)/15 aria-selected:bg-(--gray-text)/15 lg:text-xl 2xl:text-2xl"
			onclick={() => (selectedSection = section.id)}
			onkeydown={(event) => moveTab(event, index)}
		>
			{section.name}
		</button>
	{/each}
</div>

<div
	id="colors-panel-saved"
	class="w-full"
	role="tabpanel"
	tabindex="0"
	aria-labelledby="colors-tab-saved"
	hidden={selectedSection !== 'saved'}
>
	<p class="text-left text-sm text-(--foreground)" role="status">
		{clipboardStatus || 'Click to copy'}
	</p>

	{#each colors as palette, index (palette)}
		<ul
			class="palette isolate mt-2 grid auto-cols-fr grid-flow-col overflow-clip pt-(--swatch-rise)"
			aria-label={`Color set ${index + 1}`}
		>
			{#each palette as color, position (color.code)}
				{@const isNeighbor = active === palette[position - 1] || active === palette[position + 1]}
				<li
					class="swatch-slot relative min-w-0"
					style:z-index={position}
					data-lift={active === color ? 'full' : isNeighbor ? 'neighbor' : undefined}
				>
					<button
						type="button"
						class="swatch relative block h-14 w-full cursor-pointer touch-manipulation text-left focus-visible:outline-none"
						aria-label={`${color.name}, ${color.code}`}
						aria-pressed={selected === color}
						onclick={(event) => activateSwatch(color, event)}
						onpointerenter={(event) => {
							if (event.pointerType === 'mouse' && matchMedia('(any-hover: hover)').matches) {
								hovered = color;
							}
						}}
						onpointerdown={(event) => {
							if (
								event.button === 0 &&
								((selected === color && !readyToClose) ||
									(event.pointerType === 'mouse' && hovered === color))
							) {
								copyPressed = color;
							}
						}}
						onpointerup={() => (copyPressed = null)}
						onpointercancel={() => (copyPressed = null)}
						onpointerleave={() => {
							if (hovered === color) hovered = null;
							if (copyPressed === color) copyPressed = null;
						}}
						onfocus={(event) => {
							if (event.currentTarget.matches(':focus-visible')) focused = color;
						}}
						onblur={() => (focused = null)}
						style:--swatch-color={color.code}
						style:--swatch-text={labelColor(color.code)}
						style:--flash={copyPressed === color ? '20%' : undefined}
					>
						<span
							class="swatch-face absolute inset-x-0 px-1.5 py-2 text-(--swatch-text) motion-safe:transition-[top] motion-safe:duration-450 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:before:transition-colors motion-safe:before:duration-75 sm:px-3"
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
</div>

<div
	id="colors-panel-tuning"
	class="w-full"
	role="tabpanel"
	tabindex="0"
	aria-labelledby="colors-tab-tuning"
	hidden={selectedSection !== 'tuning'}
>
	<ColorTuning />
</div>

<style>
	.palette {
		--swatch-rise: 3rem;
		--swatch-radius: 1rem;
		--swatch-overlap: calc(2 * var(--swatch-radius));
	}

	/* Keep the lift in the slot's paint layer throughout the animation. */
	.swatch-face {
		height: calc(100% + var(--swatch-rise));
		top: calc(-1 * var(--lift, 0rem));
	}

	/* Extend the paint under the next corner while keeping the button's hit area fixed. */
	.swatch-face::before {
		position: absolute;
		inset: 0 calc(-1 * var(--swatch-overlap)) 0 0;
		border-radius: var(--swatch-radius) var(--swatch-radius) 0 0;
		background-color: var(--swatch-color);
		background-color: color-mix(in srgb, var(--swatch-color), white var(--flash, 0%));
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
