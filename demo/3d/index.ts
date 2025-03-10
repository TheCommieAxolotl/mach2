import 'katex/dist/katex.min.css';
import mach2 from 'mach2';

const scene = mach2.scene3d(document.querySelector('canvas#scene') as HTMLCanvasElement, {
	debug: true
});

mach2.three.render.setCamera(10, 10, 10);

scene.add(
	new (class extends mach2.Dynamic {
		public async update() {
			if (this.ctx === null) {
				throw new Error('CanvasRenderingContext2D is null');
			}

			mach2.three.graph.axis(this.ctx, 5);

			const fn = (x: number, y: number) => {
				return Math.sin(x) * Math.cos(y);
			};

			mach2.three.graph.fn2(this.ctx, fn, 5, mach2.color.red);
		}
	})()
);

scene.start();
