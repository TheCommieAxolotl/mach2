import { Color } from "~/shared";
import { fn } from "./function";

/**
 * Draw a linear function on the canvas.
 * y=mx+b
 */
export const linearFunction = (ctx: CanvasRenderingContext2D, m: number, b: number, color: Color, weight = 1) => {
    const fun = (x: number) => m * x + b;

    fn(ctx, fun, color, weight);
};

/**
 * Draw a quadratic function on the canvas.
 * y=ax^2+bx+c
 */
export const quadraticFunction = (ctx: CanvasRenderingContext2D, a: number, b: number, c: number, color: Color, weight = 1) => {
    const fun = (x: number) => a * x ** 2 + b * x + c;

    fn(ctx, fun, color, weight);
};

/**
 * Draw a cubic function on the canvas.
 * y=ax^3+bx^2+cx+d
 */
export const cubicFunction = (ctx: CanvasRenderingContext2D, a: number, b: number, c: number, d: number, color: Color, weight = 1) => {
    const fun = (x: number) => a * x ** 3 + b * x ** 2 + c * x + d;

    fn(ctx, fun, color, weight);
};

/**
 * Draw an exponential function on the canvas.
 * y=ab^x
 */
export const exponentialFunction = (ctx: CanvasRenderingContext2D, a: number, b: number, color: Color, weight = 1) => {
    const fun = (x: number) => a * b ** x;

    fn(ctx, fun, color, weight);
};

/**
 * Draw a logarithmic function on the canvas.
 * y=a*log_b(x)
 */
export const logarithmicFunction = (ctx: CanvasRenderingContext2D, a: number, b: number, color: Color, weight = 1) => {
    const fun = (x: number) => (a * Math.log(x)) / Math.log(b);

    fn(ctx, fun, color, weight);
};

/**
 * Draw a hyperbolic function on the canvas.
 * y=a/x
 */
export const hyperbolicFunction = (ctx: CanvasRenderingContext2D, a: number, b: number, color: Color, weight = 1) => {
    const fun = (x: number) => a / (b * x);

    fn(ctx, fun, color, weight);
};
