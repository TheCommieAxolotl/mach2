import mach2 from "mach2";

const scene = mach2.scene(document.querySelector("canvas") as HTMLCanvasElement, {
    debug: true,
    interactivity: false,
});

let pointerX = 0;
let pointerY = 0;

const desiredFps = 60;

window.addEventListener("mousemove", (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
});

const ms2s = (ms: number) => ms / 1000;

scene.add(
    new (class extends mach2.Dynamic {
        x = 0;
        y = 0;

        public update() {
            if (this.ctx === null) {
                throw new Error("CanvasRenderingContext2D is null");
            }

            this.x = mach2.math.lerp(this.x, pointerX, 0.1 * desiredFps * ms2s(this.deltaTime));
            this.y = mach2.math.lerp(this.y, pointerY, 0.1 * desiredFps * ms2s(this.deltaTime));

            const coords = mach2.math.domToCartesian(this.ctx, this.x, this.y);

            mach2.draw.circle(this.ctx, coords[0], coords[1], 25, `hsl(${mach2.math.lerp(120, 0, Math.hypot(this.x - pointerX, this.y - pointerY) / 500)}, 100%, 50%)`);
        }
    })()
);

scene.start();
