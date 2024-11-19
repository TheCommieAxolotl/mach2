import { parseColor } from "~/color";
import { canvasToCartesian, cartesianToCanvas, getVisibleBounds } from "~/math";
import { Color } from "~/shared";

/**
 * Draw any function of x on the canvas.
 * @param ctx - The canvas rendering context
 * @param fn - The function to draw
 * @param color - The color of the function
 * @param weight - The weight of the function
 * @example
 * fn(ctx, (x) => x ** 2, "red", 2);
 */
export const fn = (ctx: CanvasRenderingContext2D, fn: (x: number) => number | undefined, color: Color, weight = 1) => {
    ctx.strokeStyle = parseColor(color);

    ctx.beginPath();

    const bounds = getVisibleBounds(ctx);

    try {
        const start = cartesianToCanvas(ctx, bounds[0], fn(bounds[0]));
        const end = cartesianToCanvas(ctx, bounds[1], fn(bounds[1]));

        ctx.moveTo(start[0], start[1]);

        for (let x = start[0]; x < end[0]; x++) {
            const point = canvasToCartesian(ctx, x, 0);
            const last = canvasToCartesian(ctx, x - 1, 0);

            const y = fn(point[0]);
            const lastY = fn(last[0]);

            const coords = cartesianToCanvas(ctx, point[0], y);

            if (lastY === undefined || !isFinite(lastY) || y === undefined || !isFinite(y) || coords[1] < -ctx.canvas.height || coords[1] > ctx.canvas.height) {
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

export const derivative =
    (fn: (x: number) => number, h = 0.000000000001) =>
    (x: number) =>
        (fn(x + h) - fn(x)) / h;
