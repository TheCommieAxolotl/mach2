import { fn } from "./function";
import { Color } from "~/shared";

/**
 * Renders a polynomial function on the canvas.
 * @param ctx - The canvas rendering context
 * @param coefficients  - The coefficients of the polynomial function
 * @param color - The color of the function
 * @param weight - The weight of the function
 */
export const polynomial = (ctx: CanvasRenderingContext2D, coefficients: number[], color: Color, weight = 1) => {
    const fun = (x: number) => {
        let y = 0;

        for (let i = 0; i < coefficients.length; i++) {
            y += coefficients[i] * x ** (coefficients.length - i - 1);
        }

        return y;
    };

    fn(ctx, fun, color, weight);
};

/**
 * Renders a polynomial function on the canvas from its roots.
 * @param ctx - The canvas rendering context
 * @param roots - The roots of the polynomial function
 * @param color - The color of the function
 * @param weight - The weight of the function
 * @example
 * polynomialFromRoots(ctx, [1, 2, 3], "red", 2);
 */
export const polynomialFromRoots = (ctx: CanvasRenderingContext2D, roots: number[], color: Color, weight = 1) => {
    const coefficients = roots.map((root) => {
        return -root;
    });

    coefficients.push(1);

    polynomial(ctx, coefficients, color, weight);
};

/**
 * Renders a polynomial function on the canvas from its points.
 * @param ctx - The canvas rendering context
 * @param points - The points of the polynomial function
 * @param color - The color of the function
 * @param weight - The weight of the function
 * @example
 * polynomialFromPoints(ctx, [[0, 0], [1, 1], [2, 4]], "red", 2);
 */
export const polynomialFromPoints = (ctx: CanvasRenderingContext2D, points: [number, number][], color: Color, weight = 1) => {
    const n = points.length;

    const A: number[][] = [];
    const B: number[] = [];

    for (let i = 0; i < n; i++) {
        const row: number[] = [];

        for (let j = 0; j < n; j++) {
            row.push(points[i][0] ** (n - j - 1));
        }

        A.push(row);
        B.push(points[i][1]);
    }

    const coefficients = gaussianElimination(A, B);

    polynomial(ctx, coefficients, color, weight);
};

const gaussianElimination = (A: number[][], B: number[]): number[] => {
    const n = A.length;

    for (let i = 0; i < n; i++) {
        let max = i;

        for (let j = i + 1; j < n; j++) {
            if (Math.abs(A[j][i]) > Math.abs(A[max][i])) {
                max = j;
            }
        }

        [A[i], A[max]] = [A[max], A[i]];
        [B[i], B[max]] = [B[max], B[i]];

        for (let j = i + 1; j < n; j++) {
            const ratio = A[j][i] / A[i][i];

            for (let k = i; k < n; k++) {
                A[j][k] -= ratio * A[i][k];
            }

            B[j] -= ratio * B[i];
        }
    }

    const x: number[] = new Array(n);

    for (let i = n - 1; i >= 0; i--) {
        x[i] = B[i];

        for (let j = i + 1; j < n; j++) {
            x[i] -= A[i][j] * x[j];
        }

        x[i] /= A[i][i];
    }

    return x;
};
