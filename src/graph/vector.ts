import { parseColor } from '~/color';
import { getSceneId } from '~/lifecycle';
import type { Vector2 } from '~/math';
import { type Point, cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

/**
 * Renders a vector on the canvas.
 *
 * @param ctx - The canvas rendering context.
 * @param origin - The origin of the vector.
 * @param vector - The vector to render.
 * @param color - The color of the vector.
 * @param weight - The weight of the vector.
 */
export const vector = (
	ctx: CanvasRenderingContext2D,
	origin: Point,
	vector: Vector2,
	color: Color,
	weight = 1
) => {
	const scene = getSceneId(ctx.canvas);

	const end = cartesianToCanvas(ctx, origin[0] + vector.x, origin[1] + vector.y, scene);

	ctx.beginPath();
	ctx.moveTo(...cartesianToCanvas(ctx, ...origin, scene));
	ctx.lineTo(...end);
	ctx.strokeStyle = parseColor(color);
	ctx.lineWidth = weight;
	ctx.stroke();
};
