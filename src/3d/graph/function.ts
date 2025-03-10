import { parseColor } from '~/color';
import { Point, holdsValue } from '~/math';
import { Color, ObjectColor } from '~/shared';

import { camera, projectPoint } from '../render';

export const fn = (
	ctx: CanvasRenderingContext2D,
	fn: (x: number) => number | undefined,
	axisBounds: number,
	color: Color,
	weight = 1,
	z = 0
) => {
	ctx.strokeStyle = parseColor(color);

	ctx.beginPath();

	const bounds = [-axisBounds, axisBounds];

	try {
		for (let x = bounds[0]; x < bounds[1]; x += 0.1) {
			const point = [x, fn(x)];
			const last = [x - 1, fn(x - 1)];

			if (!holdsValue(point[1]) || !holdsValue(last[1])) continue;

			const coords = projectPoint(ctx, point[0]!, point[1]!, z);

			if (!coords) continue;

			if (
				!holdsValue(last[1]) ||
				!holdsValue(point[1]) ||
				coords[1] < -ctx.canvas.height ||
				coords[1] > ctx.canvas.height
			) {
				ctx.moveTo(coords[0], coords[1]);
			} else {
				ctx.lineTo(coords[0], coords[1]);
			}
		}
	} catch {}

	const lW = ctx.lineWidth;

	ctx.lineWidth = weight;
	ctx.stroke();
	ctx.closePath();

	ctx.lineWidth = lW;
};

const darkenByDistance = (c: ObjectColor, distance: number): Color => {
	if (typeof c !== 'object') return c;

	const darkestDistance = 40;

	const factor = Math.min(1, Math.max(1 - distance / darkestDistance, 0.1));

	return {
		r: c.r * factor,
		g: c.g * factor,
		b: c.b * factor,
		a: c.a
	};
};

export const fn2 = (
	ctx: CanvasRenderingContext2D,
	fn: (x: number, y: number) => number | undefined,
	axisBounds: number,
	color: Color
) => {
	const bounds = [-axisBounds, axisBounds];
	const step = 0.08;

	ctx.strokeStyle = parseColor(color);
	ctx.fillStyle = parseColor(color);

	const quads: [[Point, Point, Point, Point], number][] = [];

	for (let x = bounds[0]; x < bounds[1]; x += step) {
		for (let y = bounds[0]; y < bounds[1]; y += step) {
			const p1 = [x, y, fn(x, y)];
			const p2 = [x + step, y, fn(x + step, y)];
			const p3 = [x, y + step, fn(x, y + step)];
			const p4 = [x + step, y + step, fn(x + step, y + step)];

			if (![p1[2], p2[2], p3[2], p4[2]].every(holdsValue)) continue;

			const dx = camera[0] - p1![0]!;
			const dy = camera[1] - p1![1]!;
			const dz = camera[2] - p1![2]!;

			const s = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);

			const c1 = projectPoint(ctx, p1[0]!, p1[1]!, p1[2]!);
			const c2 = projectPoint(ctx, p2[0]!, p2[1]!, p2[2]!);
			const c3 = projectPoint(ctx, p3[0]!, p3[1]!, p3[2]!);
			const c4 = projectPoint(ctx, p4[0]!, p4[1]!, p4[2]!);

			if (![c1, c2, c3, c4].every(Boolean)) continue;

			quads.push([[c1!, c2!, c3!, c4!], s]);
		}
	}

	quads.sort((a, b) => {
		return b[1] - a[1];
	});

	for (let i = 0; i < quads.length; i++) {
		const [[c1, c2, c3, c4], s] = quads[i];

		const c = parseColor(darkenByDistance(color as ObjectColor, s));

		ctx.beginPath();
		ctx.fillStyle = c;
		ctx.strokeStyle = c;

		ctx.moveTo(c1![0], c1![1]);
		ctx.lineTo(c2![0], c2![1]);
		ctx.lineTo(c4![0], c4![1]);
		ctx.lineTo(c3![0], c3![1]);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
};
