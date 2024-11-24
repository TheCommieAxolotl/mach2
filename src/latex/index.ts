import { parseColor } from "~/color";
import { cartesianToCanvas, lerp } from "~/math";
import { Color, HorizontalPosition, VerticalPosition } from "~/shared";

let katex: typeof import("katex") | null = null;

let i = 0;

/**
 * Create a new LaTeX rendering context.
 * NOTE: This should be used either with Dynamic.once() or called outside of the update loop.
 * @param ctx - The canvas rendering context
 * @param latex - The LaTeX string to render
 * @example
 * const ltx = createLatexRenderingContext(ctx, "\\frac{1}{2}");
 * // ...
 * ltx.render(0, 0, "white");
 */
export const createLatexRenderingContext = async (ctx: CanvasRenderingContext2D, latex: string) => {
    if (!katex) {
        katex = (await import("katex")).default;
    }

    if (!katex) {
        throw new Error("Failed to load KaTeX, did you forget to install it?");
    }

    let string = "";
    try {
        string = katex.renderToString(latex, {
            output: "mathml",
            displayMode: true,
            colorIsTextColor: true,
        });
    } catch (e) {
        string = '<span style="color: red;">Invalid LaTeX</span>';
        console.error(e);
    }

    const mounted = document.createElement("div");

    mounted.innerHTML = string;
    mounted.style.position = "absolute";
    mounted.style.top = "0";
    mounted.style.left = "0";
    mounted.style.zIndex = `${1000 + i++}`;
    mounted.style.pointerEvents = "none";
    mounted.style.display = "none";
    mounted.style.userSelect = "none";

    document.body.appendChild(mounted);

    return {
        render: (x: number, y: number, color: Color, alignX: HorizontalPosition = "center", alignY: VerticalPosition = "center") => {
            const p = cartesianToCanvas(ctx, x, y);

            if (p === undefined) return () => {};

            const rect = ctx.canvas.getBoundingClientRect();

            mounted.style.display = "block";
            mounted.style.left = `${p[0] / Number(ctx.canvas.dataset.resolution) + rect.left}px`;
            mounted.style.top = `${p[1] / Number(ctx.canvas.dataset.resolution) + rect.top}px`;

            mounted.style.color = parseColor(color);

            const translateX = typeof alignX === "number" ? lerp(-1, 0, alignX) * 100 + "%" : alignX === "left" ? "-100%" : alignX === "center" ? "-50%" : "0";
            const translateY = typeof alignY === "number" ? lerp(-1, 0, alignY) * 100 + "%" : alignY === "top" ? "-100%" : alignY === "center" ? "-50%" : "0";

            mounted.style.transform = `translate(${translateX}, ${translateY})`;

            return () => {
                mounted.remove();
            };
        },
        cleanup: () => {
            mounted.remove();
        },
        setEquation: (newLatex: string) => {
            if (!katex) {
                throw new Error("KaTeX is not loaded");
            }

            let newString = "";
            try {
                newString = katex.renderToString(newLatex, {
                    output: "mathml",
                    displayMode: true,
                    colorIsTextColor: true,
                });
            } catch (e) {
                newString = '<span style="color: red;">Invalid LaTeX</span>';
                console.error(e);
            }

            mounted.innerHTML = newString;
        },
    };
};

export type LatexRenderingContext = Awaited<ReturnType<typeof createLatexRenderingContext>>;
