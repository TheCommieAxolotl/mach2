import mach2 from "mach2";

const scene = mach2.scene(document.querySelector("canvas#scene") as HTMLCanvasElement, {
    debug: true,
});

mach2.math.setScale(122);

const latex = await mach2.latex.createLatexRenderingContext(scene.ctx, "g(x) = \\sin(x) + \\cos(x)");
const latex5 = await mach2.latex.createLatexRenderingContext(scene.ctx, "f(x) = \\sin(x)");
const latex6 = await mach2.latex.createLatexRenderingContext(scene.ctx, "f(x) = \\cos(x)");
const latex2 = await mach2.latex.createLatexRenderingContext(scene.ctx, "\\bigl(\\frac{\\pi}{4}, \\sqrt{2}\\bigr)");
const latex3 = await mach2.latex.createLatexRenderingContext(scene.ctx, "(2\\pi, 1)");
const latex4 = await mach2.latex.createLatexRenderingContext(scene.ctx, "(2\\pi, 0)");

scene.add(
    new (class extends mach2.Dynamic {
        opacities = mach2.animation.createAnimatable([0, 1, 0, 0]);
        positions = mach2.animation.createAnimatable({
            horizontal: 1,
        });

        public async update() {
            if (this.ctx === null) {
                throw new Error("CanvasRenderingContext2D is null");
            }

            mach2.graph.axis(this.ctx, 0.4);

            mach2.graph.fn(this.ctx, (x) => Math.sin(x), mach2.color.opacity(mach2.color.blue, this.opacities()[1]), 4);
            mach2.graph.fn(this.ctx, (x) => Math.cos(x), mach2.color.opacity(mach2.color.red, this.opacities()[1]), 4);

            mach2.graph.point(this.ctx, 2 * Math.PI, 1, mach2.color.opacity(mach2.color.red, this.opacities()[1]), latex3, this.positions().horizontal);
            mach2.graph.point(this.ctx, 2 * Math.PI, 0, mach2.color.opacity(mach2.color.blue, this.opacities()[1]), latex4, "right", "bottom");

            mach2.graph.fn(this.ctx, (x) => Math.sin(x) + Math.cos(x) * this.opacities()[0], mach2.color.opacity(mach2.color.green, this.opacities()[0]), 4);

            mach2.graph.point(this.ctx, Math.PI / 4, 1.41, mach2.color.opacity(mach2.color.green, this.opacities()[0]), latex2, "right", "top");

            latex5.render(-4, 1.1, mach2.color.opacity(mach2.color.lightBlue, this.opacities()[2]), "right", "top");
            latex6.render(-4, -1.1, mach2.color.opacity(mach2.color.lightRed, this.opacities()[3]), this.positions().horizontal, "bottom");
            latex.render(-4, 1.5, mach2.color.opacity(mach2.color.lightGreen, this.opacities()[0]), "right", "top");
        }

        public sequence(i: number) {
            const sequences = [
                [0, 1, 1, 0],
                [0, 1, 1, 1],
                [1, 0.4, 0.4, 0.4],
                [1, 0, 0, 0],
                [0, 1, 0, 0],
            ];

            const positions = [{ horizontal: 1 }, { horizontal: 1 }, { horizontal: 0 }, { horizontal: 1 }, { horizontal: 1 }];

            const index = i % sequences.length;
            this.opacities.set(sequences[index]);
            this.positions.set(positions[index]);
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
