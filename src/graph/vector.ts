import { parseColor } from "~/color";
import { cartesianToCanvas, lerp, Point } from "~/math";
import { Color } from "~/shared";

/**
 * Renders a vector on the canvas.
 *
 * @param ctx - The canvas rendering context.
 * @param points - The points to render.
 * @param color - The color of the vector.
 * @param width - The width of the vector.
 */
export const vector = (ctx: CanvasRenderingContext2D, points: Point[], color: Color, weight = 1) => {
    if (!points.length) {
        return;
    }

    const initial = cartesianToCanvas(ctx, ...points[0]);

    ctx.beginPath();
    ctx.moveTo(initial[0], initial[1]);

    for (let i = 1; i < points.length; i++) {
        const [x, y] = cartesianToCanvas(ctx, ...points[i]);
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = parseColor(color);
    ctx.lineWidth = weight;
    ctx.stroke();
};

/**
 * Renders a curved vector on the canvas.
 *
 * @param ctx - The canvas rendering context.
 * @param points - The points to render.
 * @param color - The color of the vector.
 * @param weight - The width of the vector.
 */
export const curveVector = (ctx: CanvasRenderingContext2D, points: Point[], color: Color, weight = 1) => {
    if (!points.length) {
        return;
    }

    const initial = cartesianToCanvas(ctx, ...points[0]);

    ctx.beginPath();
    ctx.moveTo(...initial);

    for (let i = 1; i < points.length - 2; i++) {
        const cp1 = cartesianToCanvas(ctx, ...points[i]);
        const cp2 = cartesianToCanvas(ctx, ...points[i + 1]);
        const end = cartesianToCanvas(ctx, ...points[i + 2]);

        ctx.bezierCurveTo(...cp1, ...cp2, ...end);
    }

    if (points.length > 2) {
        const lastControlPoint = cartesianToCanvas(ctx, ...points[points.length - 2]);
        const lastPoint = cartesianToCanvas(ctx, ...points[points.length - 1]);
        ctx.quadraticCurveTo(...lastControlPoint, ...lastPoint);
    } else {
        const lastPoint = cartesianToCanvas(ctx, ...points[points.length - 1]);
        ctx.lineTo(...lastPoint);
    }

    ctx.strokeStyle = parseColor(color);
    ctx.lineWidth = weight;
    ctx.stroke();
};
