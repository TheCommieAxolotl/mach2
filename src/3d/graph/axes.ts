import { parseColor } from '~/color';
import { Color } from '~/shared';

import { projectPoint } from '../render/plot';

const plotAxisDirection = (
	ctx: CanvasRenderingContext2D,
	scale: number,
	direction: [number, number, number],
	style: string | CanvasPattern | CanvasGradient,
	markers: boolean = true,
	label: string = ''
) => {
	const [dx, dy, dz] = direction;

	let last = projectPoint(ctx, 0, 0, 0) || [0, 0];

	for (let i = 1; i < scale; i++) {
		const p = projectPoint(ctx, i * dx, i * dy, i * dz);

		if (!p) continue;

		const [x, y] = p;

		if (markers) {
			ctx.fillStyle = style;
			ctx.beginPath();
			ctx.arc(x, y, 4, 0, 2 * Math.PI);
			ctx.fill();
		}

		ctx.strokeStyle = style;
		ctx.beginPath();
		ctx.moveTo(last[0], last[1]);
		ctx.lineTo(x, y);
		ctx.stroke();

		last = p;
	}

	last = projectPoint(ctx, 0, 0, 0) || [0, 0];

	for (let i = 1; i < scale; i++) {
		const p = projectPoint(ctx, -i * dx, -i * dy, -i * dz);

		if (!p) continue;

		const [x, y] = p;

		if (markers) {
			ctx.fillStyle = style;
			ctx.beginPath();
			ctx.arc(x, y, 4, 0, 2 * Math.PI);
			ctx.fill();
		}

		ctx.strokeStyle = style;
		ctx.beginPath();
		ctx.moveTo(last[0], last[1]);
		ctx.lineTo(x, y);
		ctx.stroke();

		last = p;
	}

	const labelPos = scale + 5;

	const posEnd = projectPoint(ctx, labelPos * dx, labelPos * dy, labelPos * dz);
	const negEnd = projectPoint(ctx, -labelPos * dx, -labelPos * dy, -labelPos * dz);

	if (posEnd) {
		ctx.font = '32px math';
		ctx.fillStyle = style;
		ctx.fillText('+' + label, posEnd[0], posEnd[1]);
	}

	if (negEnd) {
		ctx.font = '32px math';
		ctx.fillStyle = style;
		ctx.fillText('-' + label, negEnd[0], negEnd[1]);
	}
};

export const axis = (ctx: CanvasRenderingContext2D, scale: number, opacity = 1, color?: Color) => {
	const opacitied = 80 * opacity;

	if (!color) {
		plotAxisDirection(
			ctx,
			scale,
			[1, 0, 0],
			`rgb(${opacitied * 1.5}, ${opacitied}, ${opacitied})`,
			true,
			'x'
		);
		plotAxisDirection(
			ctx,
			scale,
			[0, 1, 0],
			`rgb(${opacitied}, ${opacitied * 1.5}, ${opacitied})`,
			true,
			'y'
		);
		plotAxisDirection(
			ctx,
			scale,
			[0, 0, 1],
			`rgb(${opacitied}, ${opacitied}, ${opacitied * 1.5})`,
			true,
			'z'
		);
	} else {
		const rgb = parseColor(color);
		plotAxisDirection(ctx, scale, [1, 0, 0], rgb, true, 'x');
		plotAxisDirection(ctx, scale, [0, 1, 0], rgb, true, 'y');
		plotAxisDirection(ctx, scale, [0, 0, 1], rgb, true, 'z');
	}
};
