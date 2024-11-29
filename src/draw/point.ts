import { parseColor } from '~/color';
import { getSceneId } from '~/lifecycle';
import { cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

/**
 * Draw a simple point on the canvas.
 * @param ctx - The canvas rendering context
 * @param x - The x-coordinate of the point
 * @param y - The y-coordinate of the point
 * @param color - The color of the point
 * @param weight - The weight of the point
 */
export const point = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	color: Color,
	weight = 1
) => {
	const scene = getSceneId(ctx.canvas);

	ctx.beginPath();

	const p = cartesianToCanvas(ctx, x, y, scene);

	ctx.arc(p[0], p[1], weight, 0, 2 * Math.PI);
	ctx.fillStyle = parseColor(color);
	ctx.fill();
	ctx.closePath();
};
