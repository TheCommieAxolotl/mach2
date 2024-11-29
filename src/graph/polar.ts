import { parseColor } from '~/color';
import { getSceneId } from '~/lifecycle';
import { cartesianToCanvas, holdsValue, polarToCartesian } from '~/math';
import { Color } from '~/shared';

/**
 * Draw any function of theta on the canvas.
 * @param ctx - The canvas rendering context
 * @param fn - The function to draw
 * @param color - The color of the function
 * @param weight - The weight of the function
 * @example
 * fn(ctx, (theta) => Math.sin(theta), "red", 2);
 */
export const polar = (
	ctx: CanvasRenderingContext2D,
	fn: (theta: number) => number | undefined,
	color: Color,
	width = 1,
	bounds = 2 * Math.PI,
	precision = 0.01
) => {
	const scene = getSceneId(ctx.canvas);

	const initial = cartesianToCanvas(ctx, ...polarToCartesian(fn(0), 0), scene);

	ctx.beginPath();

	let hasInitial = false;

	if (!holdsValue(initial[0]) || !holdsValue(initial[1])) {
		ctx.moveTo(...initial);
		hasInitial = true;
	}

	for (let theta = 0; theta < bounds; theta += precision) {
		const point = cartesianToCanvas(ctx, ...polarToCartesian(fn(theta), theta), scene);

		if (holdsValue(point[0]) && holdsValue(point[1])) {
			if (!hasInitial) {
				ctx.moveTo(...point);
				hasInitial = true;
			} else {
				ctx.lineTo(...point);
			}
		} else {
			// zero is the "base case"
			ctx.lineTo(...cartesianToCanvas(ctx, 0, 0, scene));
		}
	}

	ctx.strokeStyle = parseColor(color);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.closePath();
};
