import mach2 from "mach2";
import "katex/dist/katex.min.css";

const scene = mach2.scene(document.querySelector("canvas#scene") as HTMLCanvasElement, {
    debug: true,
});

const latex = await mach2.latex.createLatexRenderingContext(scene.ctx, `r(\\theta) = \\sqrt{10\\cdot\\cos(\\theta)}`);

scene.add(
    new (class extends mach2.Dynamic {
        degree = mach2.animation.createAnimatable<number>(1);

        public async update() {
            if (this.ctx === null) {
                throw new Error("CanvasRenderingContext2D is null");
            }

            mach2.graph.axis(this.ctx, 0.4);

            latex.render(0, 14, "white", undefined, undefined, this.cU);

            mach2.graph.polar(this.ctx, (theta) => Math.sqrt(100 * Math.cos(this.degree() * theta)), mach2.color.lightBlue, 2);
        }

        public sequence(i: number) {
            this.degree.set(i + 2);

            latex.setEquation(`r(\\theta) = \\sqrt{10\\cdot\\cos(${i + 2}\\cdot\\theta)}`);
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
