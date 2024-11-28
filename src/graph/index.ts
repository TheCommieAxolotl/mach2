import { parseColor } from '~/color';
import { cartesianToCanvas } from '~/math';
import { Color } from '~/shared';

export * from './common';
export * from './polynomial';
export * from './function';
export * from './point';
export * from './segment';
export * from './polar';
export * from './superellipse';
export * from './vector';

/**
 * Render a Cartesian axis on the canvas.
 */
export const axis = (ctx: CanvasRenderingContext2D, opacity = 1, color?: Color) => {
	ctx.strokeStyle = parseColor(color) || `rgb(${80 * opacity}, ${80 * opacity}, ${80 * opacity})`;

	ctx.beginPath();

	const center = cartesianToCanvas(ctx, 0, 0);

	ctx.moveTo(0, center[1]);
	ctx.lineTo(ctx.canvas.width, center[1]);

	ctx.moveTo(center[0], 0);
	ctx.lineTo(center[0], ctx.canvas.height);

	const interval = cartesianToCanvas(ctx, 1, 0)[0] - cartesianToCanvas(ctx, 0, 0)[0];

	for (let i = center[0]; i < ctx.canvas.width; i += interval) {
		ctx.moveTo(i, center[1] - 5);
		ctx.lineTo(i, center[1] + 5);
	}

	for (let i = center[0]; i > 0; i -= interval) {
		ctx.moveTo(i, center[1] - 5);
		ctx.lineTo(i, center[1] + 5);
	}

	for (let i = center[1]; i < ctx.canvas.height; i += interval) {
		ctx.moveTo(center[0] - 5, i);
		ctx.lineTo(center[0] + 5, i);
	}

	for (let i = center[1]; i > 0; i -= interval) {
		ctx.moveTo(center[0] - 5, i);
		ctx.lineTo(center[0] + 5, i);
	}

	const lW = ctx.lineWidth;

	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	ctx.lineWidth = lW;
};
