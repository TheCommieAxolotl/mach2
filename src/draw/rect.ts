import { parseColor } from '~/color';
import { cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

/**
 * Draws a rectangle on the canvas.
 * @param ctx - The canvas context
 * @param x - x-coordinate of the top-left corner of the rectangle
 * @param y - y-coordinate of the top-left corner of the rectangle
 * @param width - width of the rectangle
 * @param height - height of the rectangle
 * @param color - color of the rectangle
 */
export const rect = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	color: Color
) => {
	ctx.beginPath();

	const point = cartesianToCanvas(ctx, x, y);

	ctx.rect(point[0], point[1], width, height);
	ctx.fillStyle = parseColor(color);
	ctx.fill();
	ctx.closePath();
};
