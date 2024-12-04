/**
 * Map a number from one range to another.
 */
export const map = (x: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Clamp a number between a minimum and maximum value.
 */
export const clamp = (x: number, min: number, max: number) => {
	return Math.min(Math.max(x, min), max);
};
