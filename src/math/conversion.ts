import { Point } from "./points";
import { lerp } from "./lerp";

let scale = 60;
let targetScale = 60;
let inLoop = false;
let translate: [number, number] = [0, 0];

export const getScale = () => scale;
export const getTargetScale = () => targetScale;

/**
 * Smoothly set the scale.
 */
export const setScale = (newScale: number) => {
    targetScale = newScale;

    loop();
};

/**
 * Set the scale immediately.
 */
export const setImmediateScale = (newScale: number) => {
    scale = newScale;
    targetScale = newScale;
};

/**
 * Translate the canvas additively.
 */
export const pan = (x: number, y: number) => {
    translate = [translate[0] + x, translate[1] + y];
};

/**
 * Translate the canvas.
 */
export const setPan = (x: number, y: number) => {
    translate = [x, y];
};

/**
 * Get the translation of the canvas.
 */
export const getTranslation = () => translate;

/**
 * Get the visible bounds of the canvas.
 * @example
 * const [x0, x1, y0, y1] = getVisibleBounds(ctx);
 *
 */
export const getVisibleBounds = (ctx: CanvasRenderingContext2D): [number, number, number, number] => {
    const centerX = ctx.canvas.width / 2 + translate[0];
    const centerY = ctx.canvas.height / 2 + translate[1];

    return [(0 - centerX) / scale, (ctx.canvas.width - centerX) / scale, (centerY - ctx.canvas.height) / scale, (centerY - 0) / scale];
};

const loop = (r?: boolean) => {
    if (inLoop && !r) return;

    inLoop = true;
    scale = lerp(scale, targetScale, 0.1);

    if (Math.abs(scale - targetScale) > 0.1) {
        requestAnimationFrame(loop.bind(null, true));
    } else {
        inLoop = false;
    }
};

/**
 * Converts a point from Cartesian coordinates to canvas coordinates.
 */
export const cartesianToCanvas = <X extends number | undefined, Y extends number | undefined>(
    ctx: CanvasRenderingContext2D,
    x: X,
    y: Y
): X extends number ? Point : Y extends number ? Point : undefined => {
    if (x === undefined || y === undefined) return undefined as any;

    const centerX = ctx.canvas.width / 2 + translate[0];
    const centerY = ctx.canvas.height / 2 + translate[1];

    return [centerX + x * scale, centerY - y * scale] as any;
};

/**
 * Converts a point from canvas coordinates to Cartesian coordinates.
 */
export const canvasToCartesian = <X extends number | undefined, Y extends number | undefined>(
    ctx: CanvasRenderingContext2D,
    x: X,
    y: Y
): X extends number ? Point : Y extends number ? Point : undefined => {
    if (x === undefined || y === undefined) return undefined as any;

    const centerX = ctx.canvas.width / 2 + translate[0];
    const centerY = ctx.canvas.height / 2 + translate[1];

    return [(x - centerX) / scale, (centerY - y) / scale] as any;
};

/**
 * Converts a point from DOM coordinates to canvas coordinates.
 */
export const domToCartesian = (ctx: CanvasRenderingContext2D, x: number, y: number): Point => {
    const rect = ctx.canvas.getBoundingClientRect();

    const resolution = Number(ctx.canvas.dataset.resolution);

    return canvasToCartesian(ctx, x * resolution - rect.left, y * resolution - rect.top);
};

/**
 * Converts a point from polar coordinates to Cartesian coordinates.
 */
export const polarToCartesian = <R extends number | undefined, T extends number | undefined>(r: R, theta: T): R extends number ? Point : T extends number ? Point : undefined => {
    if (r === undefined || theta === undefined) return undefined as any;

    return [r * Math.cos(theta), r * Math.sin(theta)] as any;
};

/**
 * Converts a point from Cartesian coordinates to polar coordinates.
 */
export const cartesianToPolar = <X extends number | undefined, Y extends number | undefined>(x: X, y: Y): X extends number ? Point : Y extends number ? Point : undefined => {
    if (x === undefined || y === undefined) return undefined as any;

    return [Math.sqrt(x ** 2 + y ** 2), Math.atan2(y, x)] as any;
};
