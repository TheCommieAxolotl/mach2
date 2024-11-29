import { parseColor } from '~/color';
import { LatexRenderingContext } from '~/latex';
import { getSceneId } from '~/lifecycle';
import { canvasToCartesian, cartesianToCanvas, lerp } from '~/math';
import { Color, HorizontalPosition, VerticalPosition } from '~/shared';

/**
 * Graph a point on the canvas.
 * @param ctx - The canvas rendering context
 * @param x - The x-coordinate of the point
 * @param y - The y-coordinate of the point
 * @param color - The color of the point
 * @param label - The label of the point
 * @param positionX - The horizontal position of the label
 * @param positionY - The vertical position of the label
 */
export const point = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	color?: Color,
	label?: string | LatexRenderingContext,
	positionX: HorizontalPosition = 'right',
	positionY: VerticalPosition = 'top',
	foregroundColor?: Color
) => {
	const scene = getSceneId(ctx.canvas);

	let opacity = 1;

	const str = parseColor(color);

	if (str?.startsWith('#') && str.length === 9) {
		opacity = parseInt(str.slice(7), 16) / 255;
	} else if (str?.startsWith('rgba')) {
		opacity = parseFloat(str.slice(5, str.length - 1).split(',')[3]);
	} else if (str?.startsWith('rgb')) {
		opacity = 1;
	}

	const canvas = cartesianToCanvas(ctx, x, y, scene);

	if (opacity !== 0) {
		ctx.fillStyle = 'black';

		ctx.beginPath();
		ctx.arc(canvas[0], canvas[1], 8, 0, 2 * Math.PI);

		ctx.fill();

		ctx.beginPath();
		ctx.arc(canvas[0], canvas[1], 6, 0, 2 * Math.PI);

		ctx.fillStyle = str || 'white';

		ctx.fill();
	}

	ctx.font = '32px math';

	if (typeof label === 'object') {
		const tx =
			typeof positionX === 'number' ? lerp(canvas[0] - 5, canvas[0] + 10, positionX)
			: positionX === 'left' ? canvas[0] - 5
			: canvas[0] + 10;
		const ty =
			typeof positionY === 'number' ? lerp(canvas[1] - 10, canvas[1], positionY)
			: positionY === 'top' ? canvas[1] - 10
			: canvas[1];

		const [x, y] = canvasToCartesian(ctx, tx, ty, scene);

		label.render(
			x,
			y,
			parseColor(foregroundColor) || `rgba(255,255,255, ${opacity})`,
			positionX ?? 'right',
			positionY ?? 'top'
		);
	} else {
		ctx.fillStyle = parseColor(foregroundColor) || `rgba(255,255,255, ${opacity})`;

		const roundedX = Math.round(x * 100) / 100;
		const roundedY = Math.round(y * 100) / 100;

		const tx =
			typeof positionX === 'number' ? lerp(canvas[0] - 10, canvas[0] + 10, positionX)
			: positionX === 'left' ? canvas[0] - 12 * (label || `(${roundedX}, ${roundedY})`).length
			: canvas[0] + 10;
		const ty =
			typeof positionY === 'number' ? lerp(canvas[1] - 15, canvas[1] + 32, positionY)
			: positionY === 'top' ? canvas[1] - 15
			: canvas[1] + 32;

		ctx.fillText(label ?? `(${roundedX}, ${roundedY})`, tx, ty);
	}
	ctx.closePath();
};
