import mach2 from "mach2";

const scene = mach2.scene(document.querySelector("canvas#scene") as HTMLCanvasElement, {
    debug: true,
    resolution: 1,
});

scene.add(
    new (class extends mach2.Dynamic {
        public update() {
            if (this.ctx === null) {
                throw new Error("CanvasRenderingContext2D is null");
            }

            mach2.graph.axis(this.ctx, 0.4);

            const bounds = mach2.math.getVisibleBounds(this.ctx);

            const maxIterations = 30;

            const scale = mach2.math.getScale();
            const translate = mach2.math.getTranslation();

            const centerX = this.ctx.canvas.width / 2 + translate[0];
            const centerY = this.ctx.canvas.height / 2 + translate[1];

            const x1 = centerX + bounds[0] * scale;
            const x2 = centerX + bounds[1] * scale;
            const y2 = centerY - bounds[2] * scale;
            const y1 = centerY - bounds[3] * scale;

            const imageData = this.ctx.createImageData(x2 - x1, y2 - y1);
            const data = imageData.data;

            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    const [cx, cy] = [(x - centerX) / scale, (centerY - y) / scale];

                    let zx = 0;
                    let zy = 0;

                    let i = 0;

                    while (i < maxIterations) {
                        let xtemp = zx * zx - zy * zy + cx;
                        zy = 2 * zx * zy + cy;
                        zx = xtemp;

                        if (zx * zx + zy * zy > 4) {
                            break;
                        }

                        i++;
                    }

                    const pixelIndex = ((y - y1) * (x2 - x1) + (x - x1)) * 4;
                    let r, g, b;
                    if (i === maxIterations) {
                        r = g = b = 0;
                    } else {
                        const t = i / maxIterations;
                        r = Math.round(9 * (1 - t) * t * t * t * 255);
                        g = Math.round(15 * (1 - t) * (1 - t) * t * t * 255);
                        b = Math.round(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
                    }

                    data[pixelIndex] = r;
                    data[pixelIndex + 1] = g;
                    data[pixelIndex + 2] = b;
                    data[pixelIndex + 3] = 255;
                }
            }

            this.ctx.putImageData(imageData, x1, y1);
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
