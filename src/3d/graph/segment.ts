import { parseColor } from '~/color';
import { Color } from '~/shared';

import { Point3 } from '../render';
import { projectPoint } from '../render/plot';

export const segment = (ctx: CanvasRenderingContext2D, points: Point3[], color: Color) => {
	if (!points.length) {
		return;
	}

	const initial = projectPoint(ctx, ...points[0]);

	if (!initial) {
		return;
	}

	const [ix, iy] = initial;

	ctx.beginPath();
	ctx.moveTo(ix, iy);

	for (let i = 1; i < points.length; i++) {
		const p = projectPoint(ctx, ...points[i]);

		if (p) {
			const [x, y] = p;
			ctx.lineTo(x, y);
		}
	}

	ctx.strokeStyle = parseColor(color);
	ctx.lineWidth = 2;
	ctx.stroke();

	ctx.closePath();
};
