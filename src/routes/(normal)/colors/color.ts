export type TuningColor = { hue: number; saturation: number; brightness: number; alpha: number };

function channels(hex: string) {
	return [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
}

export function labelColor(hex: string, background = '#000000', opacity = 1) {
	const backdrop = channels(background);
	const [red, green, blue] = channels(hex).map((channel, index) => {
		const blended = channel * opacity + backdrop[index] * (1 - opacity);
		return blended <= 0.04045 ? blended / 12.92 : ((blended + 0.055) / 1.055) ** 2.4;
	});
	const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
	const blackContrast = (luminance + 0.05) / 0.05;
	const whiteContrast = 1.05 / (luminance + 0.05);

	return blackContrast > whiteContrast ? '#000' : '#fff';
}

export function normalizeHex(value: string) {
	let hex = value.trim().replace(/^#/, '');
	if (!/^(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(hex)) return null;
	if (hex.length <= 4) hex = [...hex].map((digit) => digit.repeat(2)).join('');
	return '#' + hex.toUpperCase();
}

export function fromHex(hex: string, previousHue = 0): TuningColor {
	const [red, green, blue] = channels(hex);
	const brightness = Math.max(red, green, blue);
	const chroma = brightness - Math.min(red, green, blue);
	let hue = previousHue;

	if (chroma > 0) {
		if (brightness === red) hue = (green - blue) / chroma;
		else if (brightness === green) hue = (blue - red) / chroma + 2;
		else hue = (red - green) / chroma + 4;
		hue = (hue * 60 + 360) % 360;
	}

	return {
		hue,
		saturation: brightness === 0 ? 0 : chroma / brightness,
		brightness,
		alpha: hex.length === 9 ? parseInt(hex.slice(7), 16) : 255
	};
}

export function toHex({ hue, saturation, brightness, alpha }: TuningColor) {
	const byte = (value: number) => Math.round(value).toString(16).padStart(2, '0').toUpperCase();
	const channel = (offset: number) => {
		const sector = (offset + hue / 60) % 6;
		const level = Math.max(0, Math.min(sector, 4 - sector, 1));
		return byte(255 * brightness * (1 - saturation * level));
	};

	return '#' + channel(5) + channel(3) + channel(1) + (alpha === 255 ? '' : byte(alpha));
}
