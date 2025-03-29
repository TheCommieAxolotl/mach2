import 'katex/dist/katex.min.css';
import mach2 from 'mach2';

const scene = mach2.scene(document.querySelector('canvas#scene') as HTMLCanvasElement, {
	debug: true
});

mach2.math.setImmediateScale(122, scene.id);

const fn = (x: number) => {
	return Math.pow(x, 3) - 2 * Math.pow(x, 2) + x - 1;
};

const dfn = mach2.graph.derivative(fn);

type Step = {
	ix: number;
	iy: number;
	x: number;
	y: number;
	derivative: number;
	iteration: number;
};

const steps: Step[] = [];

// use netwon's method to find the root of the function
const newtonsMethod = (x0: number, iterations: number) => {
	let x = x0;
	for (let i = 0; i < iterations; i++) {
		const ix = steps.length > 0 ? steps[steps.length - 1].x : x0;
		const y = fn(x);
		const derivative = dfn(x);

		x = x - y / derivative;

		steps.push({
			ix,
			iy: fn(ix),
			x,
			y: fn(x),
			derivative,
			iteration: i
		});
	}
};

newtonsMethod(-1, 12);

scene.add(
	new (class extends mach2.Dynamic {
		opacities = mach2.animation.createAnimatable(steps.map(() => 0));

		public async update() {
			if (this.ctx === null) {
				throw new Error('CanvasRenderingContext2D is null');
			}

			mach2.graph.axis(this.ctx, 0.4);

			mach2.graph.fn(this.ctx, fn, mach2.color.blue, 4);

			for (let i = 0; i < steps.length; i++) {
				const step = steps[i];

				const opacity = this.opacities()[i];

				const nextX = i < steps.length - 1 ? steps[i + 1].x : step.x;

				mach2.graph.vector(
					this.ctx,
					[step.x, step.y],
					mach2.math.vec2(nextX - step.x, -step.y),
					mach2.color.opacity(mach2.color.red, opacity),
					2
				);

				mach2.graph.vector(
					this.ctx,
					[step.x, 0],
					mach2.math.vec2(0, step.y),
					mach2.color.opacity(mach2.color.yellow, opacity),
					2
				);

				mach2.graph.point(
					this.ctx,
					step.x,
					step.y,
					mach2.color.opacity(mach2.color.red, opacity)
				);
			}
		}

		public sequence(i: number) {
			if (i >= steps.length) {
				return;
			}

			const opacities = steps.map((_, index) => {
				if (index > i) return 0;
				return Math.max(0, 0.5 * (1 - (i - index) * 0.2));
			});

			this.opacities.set(opacities);
		}
	})()
);

window.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowUp') {
		scene.zoom(mach2.math.getScale(scene.id) * 1.5);
	} else if (e.key === 'ArrowDown') {
		scene.zoom(mach2.math.getScale(scene.id) / 1.5);
	}
});

scene.start();
