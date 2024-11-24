import { holdsValue, lerp } from "~/math";
import { Animatable, createAnimatable } from "./animatable";
import { fn } from "~/graph";
import { ObjectColor } from "~/shared";

export type Transformable = [Parameters<typeof fn>[1], ObjectColor, Parameters<typeof fn>[3]];

/**
 * Create a transformable function that can be rendered to a canvas while interpolating between multiple functions.
 *
 * @example
 * const transformable = createTranformable(
 *  [(x) => x, mach2.colors.red, 1],
 *  [(x) => x ** 2, mach2.colors.green, 1]
 * );
 * // ...
 * transformable.render(ctx);
 */
export const createTranformable = (...functions: Transformable[]) => {
    const len = functions.length;
    // we need slightly more precision for functions, otherwise there will be a noticeable jump
    const functionWeighting = Array.from({ length: len }, () => createAnimatable<number>(0, 0.0005));
    functionWeighting[0].setImmediate(1);

    let targetIndex = 0;

    const color: Animatable<{
        r: number;
        g: number;
        b: number;
        a?: number;
    }> = createAnimatable({ r: 255, g: 255, b: 255 });
    const weight = createAnimatable(functions[0][2] || 1);

    const render = (ctx: CanvasRenderingContext2D, draw = fn) => {
        const lastColor = color();

        const newColor = functions.reduce((acc, [_, c, __], i) => {
            const weight = functionWeighting[i]();

            acc.r = lerp(acc.r, c.r, weight);
            acc.g = lerp(acc.g, c.g, weight);
            acc.b = lerp(acc.b, c.b, weight);
            acc.a = lerp(acc.a || 1, c.a || 1, weight);

            return acc;
        }, lastColor);

        color.setImmediate(newColor);

        const lastWeight = weight();

        const newWeight = functions.reduce((acc, [_, __, w], i) => {
            const weight = functionWeighting[i]();

            return lerp(acc, w || 1, weight);
        }, lastWeight);

        weight.setImmediate(newWeight);

        const fun = (x: number) => {
            let result = 0;

            for (let i = 0; i < len; i++) {
                const res = functions[i][0](x);

                if (!holdsValue(res)) {
                    continue;
                }

                result += res! * functionWeighting[i]();
            }

            return result;
        };

        draw(ctx, fun, newColor, newWeight);
    };

    const swapTo = (index: number) => {
        if (Math.floor(index) !== index) {
            throw new Error("Index must be an integer");
        }

        if (index < 0 || index >= len) {
            throw new Error("Index out of bounds");
        }

        targetIndex = index;

        for (let i = 0; i < len; i++) {
            if (i === index) {
                functionWeighting[i].set(1);
            } else {
                functionWeighting[i].set(0);
            }
        }

        return index;
    };

    const next = () => {
        const nextIndex = (targetIndex + 1) % len;

        return swapTo(nextIndex);
    };

    return {
        render,
        swapTo,
        next,
        get weights() {
            return functionWeighting.map((weight) => weight());
        },
        get color() {
            return color();
        },
    };
};

export const wrapFunction = (...fn: Transformable): Transformable => {
    return fn;
};
