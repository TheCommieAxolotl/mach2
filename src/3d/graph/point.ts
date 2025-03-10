import { parseColor } from '~/color';
import { Color } from '~/shared';

import { projectPoint } from '../render/plot';

export const point = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	z: number,
	color: Color
) => {
	const p = projectPoint(ctx, x, y, z);

	if (p) {
		const [nx, ny] = p;

		ctx.fillStyle = parseColor(color);
		ctx.beginPath();
		ctx.arc(nx, ny, 5, 0, 2 * Math.PI);

		ctx.fill();

		return [nx, ny];
	}
};
