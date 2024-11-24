import mach2 from "mach2";
import "katex/dist/katex.min.css";

const scene = mach2.scene(document.querySelector("canvas#scene") as HTMLCanvasElement, {
    background: mach2.color.white,
    interactivity: false,
});

const latex = await mach2.latex.createLatexRenderingContext(scene.ctx, `\\sin(x)=x\\cdot\\prod_{n=1}^{\\infty}\\Bigl(1-\\frac{x^2}{n^2\\pi^2}\\Bigr)`);

const latex2 = await mach2.latex.createLatexRenderingContext(scene.ctx, `\\zeta(s)=\\frac{e^{a+bs}}{s-1}\\prod_{\\zeta(\\alpha)=0}\\Bigl(1-\\frac{s}{\\alpha}\\Bigr)e^{s/\\alpha}`);

scene.add(
    new (class extends mach2.Dynamic {
        public async update() {
            if (this.ctx === null) {
                throw new Error("CanvasRenderingContext2D is null");
            }

            latex.render(0, 5, "black", undefined, undefined, 2 * this.cU);

            latex2.render(0, -5, "black", undefined, undefined, 2 * this.cU);
        }
    })()
);

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        scene.zoom(mach2.math.getScale() * 1.5);
    } else if (e.key === "ArrowDown") {
        scene.zoom(mach2.math.getScale() / 1.5);
    }
});

scene.start();
