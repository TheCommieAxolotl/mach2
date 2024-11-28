import { parseColor } from '~/color';
import { cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

/**
 * Draws a superellipse on the canvas.
 * |(x-k)/r_x|^d + |(y-h)/r_y|^d = 1
 */
export const superellipse = (
	ctx: CanvasRenderingContext2D,
	k: number,
	h: number,
	radiusX: number,
	degree: number,
	color: Color,
	weight = 1,
	radiusY = radiusX,
	bounds = 2 * Math.PI,
	precision = 0.01
) => {
	ctx.beginPath();

	ctx.strokeStyle = parseColor(color);

	const points: [number, number][] = [];

	for (let t = 0; t < bounds; t += precision) {
		const x = k + radiusX * Math.sign(Math.cos(t)) * Math.abs(Math.cos(t)) ** (2 / degree);
		const y = h + radiusY * Math.sign(Math.sin(t)) * Math.abs(Math.sin(t)) ** (2 / degree);

		points.push([x, y]);
	}

	for (let i = 0; i < points.length; i++) {
		const [x, y] = cartesianToCanvas(ctx, points[i][0], points[i][1]);

		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}

	const lW = ctx.lineWidth;

	ctx.lineWidth = weight;
	ctx.stroke();
	ctx.closePath();

	ctx.lineWidth = lW;
};
