import { describe, expect, test } from "vitest";
import mach2 from "mach2";

const canvas = document.createElement("canvas");

canvas.width = 1024;
canvas.height = 768;

const ctx = canvas.getContext("2d")!;

describe("Drawing Objects", () => {
    test("Draw a circle", () => {
        expect(() => mach2.draw.circle(ctx, 0, 0, 50, "red")).not.toThrow();

        expect(ctx.fillStyle).toBe("#ff0000");

        // @ts-expect-error - mocking
        const path = ctx.__getPath();

        expect(path).toEqual([
            { type: "beginPath", transform: [1, 0, 0, 1, 0, 0], props: {} },
            {
                type: "arc",
                transform: [1, 0, 0, 1, 0, 0],
                props: {
                    x: 512,
                    y: 384,
                    radius: 50,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    anticlockwise: false,
                },
            },
            { type: "closePath", transform: [1, 0, 0, 1, 0, 0], props: {} },
        ]);
    });

    test("Draw a rectangle", () => {
        expect(() => mach2.draw.rect(ctx, 0, 0, 100, 100, "blue")).not.toThrow();

        expect(ctx.fillStyle).toBe("#0000ff");

        // @ts-expect-error - mocking
        const path = ctx.__getPath();

        expect(path).toEqual([
            { type: "beginPath", transform: [1, 0, 0, 1, 0, 0], props: {} },
            {
                type: "rect",
                transform: [1, 0, 0, 1, 0, 0],
                props: {
                    x: 512,
                    y: 384,
                    width: 100,
                    height: 100,
                },
            },
            { type: "closePath", transform: [1, 0, 0, 1, 0, 0], props: {} },
        ]);
    });
});
