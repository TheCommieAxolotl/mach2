import { lerp } from './lerp';
import { Point } from './points';

const defaultScale = 60;

const scales: number[] = [];
const targetScales: number[] = [];
const inLoops: boolean[] = [];
const translates: [number, number][] = [];

export const getScale = (scene: number) => scales[scene];
export const getTargetScale = (scene: number) => targetScales[scene];

/**
 * Smoothly set the scale.
 */
export const setScale = (newScale: number, scene: number) => {
	if (scales[scene] === undefined) {
		scales[scene] = defaultScale;
	}

	targetScales[scene] = newScale;

	loop(scene);
};

/**
 * Set the scale immediately.
 */
export const setImmediateScale = (newScale: number, scene: number) => {
	scales[scene] = newScale;
	targetScales[scene] = newScale;
};

/**
 * Translate the canvas additively.
 */
export const pan = (x: number, y: number, scene: number) => {
	translates[scene] = [(translates[scene]?.[0] || 0) + x, (translates[scene]?.[1] || 0) + y];
};

/**
 * Translate the canvas.
 */
export const setPan = (x: number, y: number, scene: number) => {
	translates[scene] = [x, y];
};

/**
 * Get the translation of the canvas.
 */
export const getTranslation = (scene: number) => translates[scene];

/**
 * Get the visible bounds of the canvas.
 * @example
 * const [x0, x1, y0, y1] = getVisibleBounds(ctx);
 *
 */
export const getVisibleBounds = (
	ctx: CanvasRenderingContext2D,
	scene: number
): [number, number, number, number] => {
	translates[scene] ??= [0, 0];
	scales[scene] ??= defaultScale;

	const centerX = ctx.canvas.width / 2 + (translates[scene][0] || 0);
	const centerY = ctx.canvas.height / 2 + (translates[scene][1] || 0);

	return [
		(0 - centerX) / scales[scene],
		(ctx.canvas.width - centerX) / scales[scene],
		(centerY - ctx.canvas.height) / scales[scene],
		(centerY - 0) / scales[scene]
	];
};

const loop = (scene: number, r?: boolean) => {
	if (inLoops[scene] && !r) return;

	inLoops[scene] = true;
	scales[scene] = lerp(scales[scene], targetScales[scene], 0.1);

	if (Math.abs(scales[scene] - targetScales[scene]) > 0.1) {
		requestAnimationFrame(loop.bind(null, scene, true));
	} else {
		inLoops[scene] = false;
	}
};

/**
 * Converts a point from Cartesian coordinates to canvas coordinates.
 */
export const cartesianToCanvas = <X extends number | undefined, Y extends number | undefined>(
	ctx: CanvasRenderingContext2D,
	x: X,
	y: Y,
	scene: number
): X extends number ? Point
: Y extends number ? Point
: undefined => {
	if (x === undefined || y === undefined) return undefined as any;

	translates[scene] ??= [0, 0];
	scales[scene] ??= defaultScale;

	const centerX = ctx.canvas.width / 2 + translates[scene][0];
	const centerY = ctx.canvas.height / 2 + translates[scene][1];

	return [centerX + x * scales[scene], centerY - y * scales[scene]] as any;
};

/**
 * Converts a point from canvas coordinates to Cartesian coordinates.
 */
export const canvasToCartesian = <X extends number | undefined, Y extends number | undefined>(
	ctx: CanvasRenderingContext2D,
	x: X,
	y: Y,
	scene: number
): X extends number ? Point
: Y extends number ? Point
: undefined => {
	if (x === undefined || y === undefined) return undefined as any;

	translates[scene] ??= [0, 0];
	scales[scene] ??= defaultScale;

	const centerX = ctx.canvas.width / 2 + (translates[scene][0] || 0);
	const centerY = ctx.canvas.height / 2 + (translates[scene][1] || 0);

	return [(x - centerX) / scales[scene], (centerY - y) / scales[scene]] as any;
};

/**
 * Converts a point from DOM coordinates to canvas coordinates.
 */
export const domToCartesian = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	scene: number
): Point => {
	const rect = ctx.canvas.getBoundingClientRect();

	const resolution = Number(ctx.canvas.dataset.resolution);

	return canvasToCartesian(ctx, x * resolution - rect.left, y * resolution - rect.top, scene);
};

/**
 * Converts a point from polar coordinates to Cartesian coordinates.
 */
export const polarToCartesian = <R extends number | undefined, T extends number | undefined>(
	r: R,
	theta: T
): R extends number ? Point
: T extends number ? Point
: undefined => {
	if (r === undefined || theta === undefined) return undefined as any;

	return [r * Math.cos(theta), r * Math.sin(theta)] as any;
};

/**
 * Converts a point from Cartesian coordinates to polar coordinates.
 */
export const cartesianToPolar = <X extends number | undefined, Y extends number | undefined>(
	x: X,
	y: Y
): X extends number ? Point
: Y extends number ? Point
: undefined => {
	if (x === undefined || y === undefined) return undefined as any;

	return [Math.sqrt(x ** 2 + y ** 2), Math.atan2(y, x)] as any;
};
