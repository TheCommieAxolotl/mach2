import { describe, expect, test } from "vitest";
import mach2 from "mach2";

describe("Math and Conversions", () => {
    test("Pythagorean distance", () => {
        expect(mach2.math.distance([0, 0], [3, 4])).toBe(5);
        expect(mach2.math.distance([0, 0], [0, 0])).toBe(0);
        expect(mach2.math.distance([0, 0], [1, 1])).toBeCloseTo(Math.sqrt(2));
    });

    test("Degrees to radians", () => {
        expect(mach2.math.degToRad(0)).toBe(0);
        expect(mach2.math.degToRad(90)).toBeCloseTo(Math.PI / 2);
        expect(mach2.math.degToRad(180)).toBeCloseTo(Math.PI);
    });

    test("Radians to degrees", () => {
        expect(mach2.math.radToDeg(0)).toBe(0);
        expect(mach2.math.radToDeg(Math.PI / 2)).toBeCloseTo(90);
        expect(mach2.math.radToDeg(Math.PI)).toBeCloseTo(180);
    });

    test("Map values", () => {
        expect(mach2.math.map(0, 0, 1, 0, 100)).toBe(0);
        expect(mach2.math.map(0.5, 0, 1, 0, 100)).toBe(50);
        expect(mach2.math.map(1, 0, 1, 0, 100)).toBe(100);
    });

    test("Lerp", () => {
        expect(mach2.math.lerp(0, 100, 0)).toBe(0);
        expect(mach2.math.lerp(0, 100, 0.5)).toBe(50);
        expect(mach2.math.lerp(0, 100, 1)).toBe(100);
    });
});

const canvas = document.createElement("canvas");

canvas.width = 1024;
canvas.height = 768;

const ctx = canvas.getContext("2d")!;

describe("Canvas Math", () => {
    test("Convert cartesian coordinates to canvas coordinates", () => {
        expect(mach2.math.cartesianToCanvas(ctx, 0, 0)).toEqual([512, 384]);
        expect(mach2.math.cartesianToCanvas(ctx, 1, 1)).toEqual([572, 324]);
        expect(mach2.math.cartesianToCanvas(ctx, -1, -1)).toEqual([452, 444]);
    });

    test("Convert canvas coordinates to cartesian coordinates", () => {
        expect(mach2.math.canvasToCartesian(ctx, 512, 384)).toEqual([0, 0]);
        expect(mach2.math.canvasToCartesian(ctx, 572, 324)).toEqual([1, 1]);
        expect(mach2.math.canvasToCartesian(ctx, 452, 444)).toEqual([-1, -1]);
    });

    test("Gets bounds of a canvas", () => {
        const bounds = mach2.math.getVisibleBounds(ctx);

        const canvas = mach2.math.cartesianToCanvas(ctx, bounds[0], bounds[2]);
        const canvas2 = mach2.math.cartesianToCanvas(ctx, bounds[1], bounds[3]);

        expect(canvas).toEqual([0, 768]);
        expect(canvas2).toEqual([1024, 0]);
    });
});
