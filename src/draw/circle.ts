import { parseColor } from "~/color";
import { cartesianToCanvas } from "~/math";
import { Color } from "~/shared";

/**
 * Draws a circle on the canvas.
 * @param ctx - The canvas context
 * @param x - x-coordinate of the center of the circle
 * @param y - y-coordinate of the center of the circle
 * @param radius - radius of the circle
 * @param color  - color of the circle
 */
export const circle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: Color) => {
    ctx.beginPath();

    const point = cartesianToCanvas(ctx, x, y);

    ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI);
    ctx.fillStyle = parseColor(color);
    ctx.fill();
    ctx.closePath();
};

/**
 * Draws a semi-circle on the canvas.
 * @param ctx - The canvas context
 * @param x - x-coordinate of the center of the semi-circle
 * @param y - y-coordinate of the center of the semi-circle
 * @param radius - radius of the semi-circle
 * @param color - color of the semi-circle
 * @param startAngle - start angle of the semi-circle
 * @param endAngle - end angle of the semi-circle
 */
export const semiCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: Color, startAngle: number, endAngle: number) => {
    ctx.beginPath();

    const point = cartesianToCanvas(ctx, x, y);

    ctx.arc(point[0], point[1], radius, startAngle, endAngle);
    ctx.fillStyle = parseColor(color);
    ctx.fill();
    ctx.closePath();
};

/**
 * Draws an arc on the canvas.
 * @param ctx - The canvas context
 * @param x - x-coordinate of the center of the arc
 * @param y - y-coordinate of the center of the arc
 * @param radius - radius of the arc
 * @param color - color of the arc
 * @param startAngle - start angle of the arc
 * @param endAngle - end angle of the arc
 */
export const arc = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: Color, startAngle: number, endAngle: number) => {
    ctx.beginPath();

    const point = cartesianToCanvas(ctx, x, y);

    ctx.arc(point[0], point[1], radius, startAngle, endAngle);
    ctx.strokeStyle = parseColor(color);
    ctx.stroke();
    ctx.closePath();
};
