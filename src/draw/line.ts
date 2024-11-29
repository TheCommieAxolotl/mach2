import { parseColor } from '~/color';
import { getSceneId } from '~/lifecycle';
import { cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

/**
 * Draw a line from (x1, y1) to (x2, y2)
 * @param ctx - The canvas rendering context
 * @param x1 - The x-coordinate of the starting point
 * @param y1 - The y-coordinate of the starting point
 * @param x2 - The x-coordinate of the ending point
 */
export const line = (
	ctx: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color: Color,
	weight = 1
) => {
	const scene = getSceneId(ctx.canvas);

	ctx.beginPath();
	const p1 = cartesianToCanvas(ctx, x1, y1, scene);
	const p2 = cartesianToCanvas(ctx, x2, y2, scene);

	ctx.moveTo(p1[0], p1[1]);
	ctx.lineTo(p2[0], p2[1]);

	ctx.strokeStyle = parseColor(color);

	const lW = ctx.lineWidth;

	ctx.lineWidth = weight;
	ctx.stroke();
	ctx.closePath();

	ctx.lineWidth = lW;
};

/**
 * Draw a curve from (x1, y1) to (x3, y3) with control point (x2, y2)
 * @param ctx - The canvas rendering context
 * @param x1 - The x-coordinate of the starting point
 * @param y1 - The y-coordinate of the starting point
 * @param x2 - The x-coordinate of the control point
 * @param y2 - The y-coordinate of the control point
 * @param x3 - The x-coordinate of the ending point
 * @param y3 - The y-coordinate of the ending point
 * @param color - The color of the curve
 * @param weight - The weight of the curve
 */
export const curve = (
	ctx: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
	color: Color,
	weight = 1
) => {
	const scene = getSceneId(ctx.canvas);

	ctx.beginPath();

	const p1 = cartesianToCanvas(ctx, x1, y1, scene);
	const p2 = cartesianToCanvas(ctx, x2, y2, scene);
	const p3 = cartesianToCanvas(ctx, x3, y3, scene);

	ctx.moveTo(p1[0], p1[1]);
	ctx.quadraticCurveTo(p2[0], p2[1], p3[0], p3[1]);

	ctx.strokeStyle = parseColor(color);

	const lW = ctx.lineWidth;

	ctx.lineWidth = weight;
	ctx.stroke();
	ctx.closePath();

	ctx.lineWidth = lW;
};
