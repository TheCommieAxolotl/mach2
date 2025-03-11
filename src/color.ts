import { Color, ObjectColor } from './shared';

export const white: ObjectColor = {
	r: 255,
	g: 255,
	b: 255
}; // rgb(255, 255, 255)
export const black: ObjectColor = {
	r: 0,
	g: 0,
	b: 0
}; // rgb(0, 0, 0)
export const red: ObjectColor = {
	r: 199,
	g: 68,
	b: 64
}; // rgb(199, 68, 64)
export const lightRed: ObjectColor = {
	r: 242,
	g: 99,
	b: 94
}; // rgb(242, 99, 94)
export const blue: ObjectColor = {
	r: 44,
	g: 112,
	b: 179
}; // rgb(44, 112, 179)
export const lightBlue: ObjectColor = {
	r: 92,
	g: 154,
	b: 209
}; // rgb(92, 154, 209)
export const green: ObjectColor = {
	r: 55,
	g: 140,
	b: 71
}; // rgb(55, 140, 71)
export const lightGreen: ObjectColor = {
	r: 95,
	g: 169,
	b: 90
}; // rgb(95, 169, 90)
export const yellow: ObjectColor = {
	r: 232,
	g: 197,
	b: 71
}; // rgb(232, 197, 71)
export const lightYellow: ObjectColor = {
	r: 242,
	g: 217,
	b: 102
}; // rgb(242, 217, 102)
export const orange: ObjectColor = {
	r: 232,
	g: 139,
	b: 44
}; // rgb(232, 139, 44)
export const lightOrange: ObjectColor = {
	r: 242,
	g: 169,
	b: 77
}; // rgb(242, 169, 77)
export const purple: ObjectColor = {
	r: 160,
	g: 94,
	b: 181
}; // rgb(160, 94, 181)
export const lightPurple: ObjectColor = {
	r: 183,
	g: 141,
	b: 201
}; // rgb(183, 141, 201)
export const pink: ObjectColor = {
	r: 217,
	g: 123,
	b: 172
}; // rgb(217, 123, 172)
export const lightPink: ObjectColor = {
	r: 226,
	g: 162,
	b: 193
}; // rgb(226, 162, 193)

export const all = [
	white,
	black,
	red,
	lightRed,
	blue,
	lightBlue,
	green,
	lightGreen,
	yellow,
	lightYellow,
	orange,
	lightOrange,
	pink,
	lightPink,
	purple,
	lightPurple
];

/**
 * Take any color and return a new color with the specified opacity.
 */
export const opacity = (color: Color, opacity: number): Exclude<Color, ObjectColor> => {
	const str = parseColor(color);

	if (typeof str !== 'string') {
		return str;
	}

	const format =
		str.startsWith('#') ? 'hex'
		: str.startsWith('rgba') ? 'rgba'
		: str.startsWith('rgb') ? 'rgb'
		: str.startsWith('hsl') ? 'hsl'
		: 'unsupported';

	if (format === 'unsupported') {
		return str;
	}

	if (format === 'hex') {
		return (
			str +
			Math.floor(opacity * 255)
				.toString(16)
				.padStart(2, '0')
		);
	}

	if (format === 'rgb') {
		return `rgba(${str.slice(4, str.length - 1)}, ${opacity})`;
	}

	if (format === 'rgba') {
		return str.slice(0, str.length - 2) + opacity + ')';
	}

	if (format === 'hsl') {
		return `hsla(${str.slice(4, str.length - 1)}, ${opacity})`;
	}

	return str;
};

/**
 * Take any color and return a new color with the specified opacity.
 */
export const objectOpacity = (color: ObjectColor, opacity: number): ObjectColor => {
	return { ...color, a: opacity };
};

/**
 * Parse a color to a string.
 */
export const parseColor = (
	color?: Color,
	latex?: boolean
): string | CanvasGradient | CanvasPattern => {
	if (!color) {
		return '';
	}

	if (color instanceof CanvasGradient || color instanceof CanvasPattern) {
		return color;
	}

	if (typeof color === 'string') {
		return color;
	}

	const { r, g, b, a } = color;

	if (latex) {
		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	}

	return `rgba(${r},${g},${b},${a ?? 1})`;
};
