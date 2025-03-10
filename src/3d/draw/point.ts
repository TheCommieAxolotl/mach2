import { parseColor } from '~/color';
import { Color } from '~/shared';

import { Point3 } from '../render';
import { projectPoint } from '../render/plot';

export const point = (ctx: CanvasRenderingContext2D, point: Point3, color: Color) => {
	const [x, y, z] = point;

	const p = projectPoint(ctx, x, y, z);

	if (p) {
		const [nx, ny] = p;

		ctx.fillStyle = parseColor(color);
		ctx.beginPath();
		ctx.arc(nx, ny, 2, 0, 2 * Math.PI);

		ctx.fill();

		return [nx, ny];
	}
};
