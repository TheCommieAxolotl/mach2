import { parseColor } from '~/color';
import { getSceneId } from '~/lifecycle';
import { Point, cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

/**
 * Renders a segment on the canvas.
 *
 * @param ctx - The canvas rendering context.
 * @param points - The points to render.
 * @param color - The color of the segment.
 * @param width - The width of the segment.
 */
export const segment = (
	ctx: CanvasRenderingContext2D,
	points: Point[],
	color: Color,
	weight = 1
) => {
	const scene = getSceneId(ctx.canvas);

	if (!points.length) {
		return;
	}

	const initial = cartesianToCanvas(ctx, ...points[0], scene);

	ctx.beginPath();
	ctx.moveTo(initial[0], initial[1]);

	for (let i = 1; i < points.length; i++) {
		const [x, y] = cartesianToCanvas(ctx, ...points[i], scene);
		ctx.lineTo(x, y);
	}

	ctx.strokeStyle = parseColor(color);
	ctx.lineWidth = weight;
	ctx.stroke();
};

/**
 * Renders a curved segment on the canvas.
 *
 * @param ctx - The canvas rendering context.
 * @param points - The points to render.
 * @param color - The color of the segment.
 * @param weight - The width of the segment.
 */
export const curveSegment = (
	ctx: CanvasRenderingContext2D,
	points: Point[],
	color: Color,
	weight = 1
) => {
	const scene = getSceneId(ctx.canvas);

	if (!points.length) {
		return;
	}

	const initial = cartesianToCanvas(ctx, ...points[0], scene);

	ctx.beginPath();
	ctx.moveTo(...initial);

	for (let i = 1; i < points.length - 2; i++) {
		const cp1 = cartesianToCanvas(ctx, ...points[i], scene);
		const cp2 = cartesianToCanvas(ctx, ...points[i + 1], scene);
		const end = cartesianToCanvas(ctx, ...points[i + 2], scene);

		ctx.bezierCurveTo(...cp1, ...cp2, ...end);
	}

	if (points.length > 2) {
		const lastControlPoint = cartesianToCanvas(ctx, ...points[points.length - 2], scene);
		const lastPoint = cartesianToCanvas(ctx, ...points[points.length - 1], scene);
		ctx.quadraticCurveTo(...lastControlPoint, ...lastPoint);
	} else {
		const lastPoint = cartesianToCanvas(ctx, ...points[points.length - 1], scene);
		ctx.lineTo(...lastPoint);
	}

	ctx.strokeStyle = parseColor(color);
	ctx.lineWidth = weight;
	ctx.stroke();
};
