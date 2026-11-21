<script lang="ts">
	import { Check, Copy, Shuffle } from '@lucide/svelte';
	import { colors } from '$lib/data';
	import { radixColors } from '$lib/tuning-colors';
	import { fromHex, labelColor, normalizeHex, toHex, type TuningColor } from './color';

	const savedColors = colors.flat().map(({ code }) => code.toUpperCase());
	const randomColors = [...new Set([...savedColors, ...radixColors])];
	const channels = ['hue', 'saturation', 'brightness', 'alpha'] as const;
	const fieldBackdrop = '#161616';
	const actionStyle =
		'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-(--foreground) hover:bg-(--gray-text)/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)';

	let palette = $state(savedColors.slice(0, 6).map((hex) => fromHex(hex)));
	let drafts = $state<(string | undefined)[]>([]);
	let activeIndex = $state(0);
	let copiedIndex = $state<number | null>(null);
	let status = $state('');

	const hexValues = $derived(palette.map(toHex));
	const activeColor = $derived(palette[activeIndex]);
	const angle = $derived((activeColor.hue * Math.PI) / 180);
	const markerX = $derived(50 + Math.cos(angle) * activeColor.saturation * 50);
	const markerY = $derived(50 + Math.sin(angle) * activeColor.saturation * 50);

	function updateColor(index: number, changes: Partial<TuningColor>) {
		palette[index] = { ...palette[index], ...changes };
		if (copiedIndex === index) copiedIndex = null;
		status = '';
	}

	function updateFromWheel(event: PointerEvent) {
		const wheel = event.currentTarget as HTMLElement;
		const { left, top, width, height } = wheel.getBoundingClientRect();
		const x = (event.clientX - left - width / 2) / (width / 2);
		const y = (event.clientY - top - height / 2) / (height / 2);
		const saturation = Math.min(1, Math.hypot(x, y));
		const hue =
			saturation === 0 ? activeColor.hue : ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
		updateColor(activeIndex, { hue, saturation });
	}

	function updateDraft(index: number, value: string) {
		drafts[index] = value;
		const hex = normalizeHex(value);
		if (hex && value.trim().replace(/^#/, '').length >= 6) {
			updateColor(index, fromHex(hex, palette[index].hue));
		}
	}

	function finishEditing(index: number, input: HTMLInputElement) {
		const draft = drafts[index];
		if (draft === undefined) return;
		const hex = normalizeHex(draft);
		if (hex) {
			updateColor(index, fromHex(hex, palette[index].hue));
		} else {
			status = 'Enter a hex code with 3, 4, 6 or 8 digits.';
		}
		drafts[index] = undefined;
		input.value = toHex(palette[index]);
	}

	async function copyColor(index: number) {
		const draft = drafts[index];
		const hex = (draft && normalizeHex(draft)) || toHex(palette[index]);
		try {
			await navigator.clipboard.writeText(hex);
			if ((draft && drafts[index] === draft) || toHex(palette[index]) === hex) {
				copiedIndex = index;
				status = `Copied ${hex}.`;
			}
		} catch {
			copiedIndex = null;
			status = `Could not copy ${hex}.`;
		}
	}

	function randomize(index?: number) {
		const currentColors = new Set(palette.map((color) => toHex({ ...color, alpha: 255 })));
		const available = randomColors.filter((hex) => !currentColors.has(hex));
		const takeColor = (color: TuningColor) => {
			const [hex] = available.splice(Math.floor(Math.random() * available.length), 1);
			return { ...fromHex(hex, color.hue), alpha: color.alpha };
		};

		if (index === undefined) {
			palette = palette.map(takeColor);
			drafts = [];
			copiedIndex = null;
			status = '';
		} else {
			activeIndex = index;
			updateColor(index, takeColor(palette[index]));
			drafts[index] = undefined;
			status = `Color ${index + 1} is now ${toHex(palette[index])}.`;
		}
	}
</script>

<div class="@container">
	<div class="grid items-end gap-6 @xl:grid-cols-2 @xl:gap-8">
		<div class="flex min-w-0 flex-col gap-3">
			<div class="px-3 py-2">
				<div
					class="color-wheel relative mx-auto aspect-square w-full max-w-62 cursor-crosshair touch-none rounded-full"
					aria-hidden="true"
					onpointerdown={(event) => {
						if (!event.isPrimary || event.button !== 0) return;
						const focused = document.activeElement;
						if (focused instanceof HTMLInputElement && focused.type === 'text') focused.blur();
						event.currentTarget.setPointerCapture(event.pointerId);
						updateFromWheel(event);
					}}
					onpointermove={(event) => {
						if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromWheel(event);
					}}
				>
					<span
						class="pointer-events-none absolute size-5 -translate-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_#000]"
						style:left={markerX + '%'}
						style:top={markerY + '%'}
						style:background-color={hexValues[activeIndex].slice(0, 7)}
					></span>
				</div>
			</div>

			{#each channels as channel (channel)}
				{@const label =
					channel === 'alpha' ? 'Opacity' : channel[0].toUpperCase() + channel.slice(1)}
				{@const maximum = channel === 'hue' ? 359 : 100}
				{@const scale = channel === 'alpha' ? 100 / 255 : channel === 'hue' ? 1 : 100}
				{@const value = Math.min(maximum, Math.round(activeColor[channel] * scale))}
				<label
					class={[
						'flex flex-col gap-0.5 text-sm text-(--foreground)',
						(channel === 'hue' || channel === 'saturation') && 'sr-only focus-within:not-sr-only'
					]}
				>
					<span class="flex items-center justify-between">
						{label}
						<span class="font-mono text-xs" aria-hidden="true">
							{value}{channel === 'hue' ? '°' : '%'}
						</span>
					</span>
					<input
						class="h-7 w-full cursor-pointer accent-(--headings) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
						type="range"
						min="0"
						max={maximum}
						{value}
						aria-valuetext={channel === 'hue' ? `${value} degrees` : `${value} percent`}
						oninput={(event) => {
							const next = event.currentTarget.valueAsNumber / scale;
							updateColor(activeIndex, {
								[channel]: channel === 'alpha' ? Math.round(next) : next
							});
						}}
					/>
				</label>
			{/each}
		</div>

		<div class="flex min-w-0 flex-col gap-2" style:--field-backdrop={fieldBackdrop}>
			{#each hexValues as hex, index (index)}
				{@const textColor = labelColor(hex, fieldBackdrop, palette[index].alpha / 255)}
				<div class="grid grid-cols-[minmax(0,1fr)_2.75rem_2.75rem] items-center gap-1.5">
					<input
						type="text"
						value={drafts[index] ?? hex}
						spellcheck="false"
						autocomplete="off"
						autocapitalize="off"
						aria-label={`Color ${index + 1} hex code`}
						data-active={index === activeIndex}
						class="hex-field min-h-11 w-full min-w-0 rounded-lg px-2 py-1 text-center font-mono text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
						style:--field-color={hex}
						style:color={textColor}
						onfocus={() => (activeIndex = index)}
						onclick={() => (activeIndex = index)}
						oninput={(event) => updateDraft(index, event.currentTarget.value)}
						onblur={(event) => finishEditing(index, event.currentTarget)}
						onkeydown={(event) => {
							if (event.key === 'Enter') finishEditing(index, event.currentTarget);
						}}
					/>
					<button
						type="button"
						class={actionStyle}
						aria-label={`Copy color ${index + 1}`}
						title={copiedIndex === index ? 'Copied' : 'Copy'}
						onclick={() => copyColor(index)}
					>
						{#if copiedIndex === index}
							<Check size={18} />
						{:else}
							<Copy size={18} />
						{/if}
					</button>
					<button
						type="button"
						class={actionStyle}
						aria-label={`Randomize color ${index + 1}`}
						title="Randomize"
						onclick={() => randomize(index)}
					>
						<Shuffle size={18} />
					</button>
				</div>
			{/each}
			<button
				type="button"
				class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--gray-text)/10 px-2 py-1 text-lg hover:bg-(--gray-text)/20 lg:text-xl 2xl:text-2xl"
				onclick={() => randomize()}
			>
				<Shuffle size={17} />
				Randomize all
			</button>
		</div>
	</div>
	<p class="mt-4 text-sm text-(--foreground) empty:sr-only" role="status">
		{status}
	</p>
</div>

<style>
	.color-wheel {
		background:
			radial-gradient(circle closest-side, white, transparent),
			conic-gradient(from 90deg, red, yellow, lime, cyan, blue, magenta, red);
	}

	.hex-field {
		background: linear-gradient(var(--field-color), var(--field-color)), var(--field-backdrop);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 12%);
	}

	.hex-field[data-active='true'] {
		box-shadow:
			inset 0 0 0 1px var(--field-backdrop),
			inset 0 0 0 3px currentColor;
	}
</style>
