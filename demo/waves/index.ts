import 'katex/dist/katex.min.css';
import mach2 from 'mach2';

const scene = mach2.scene(document.querySelector('canvas#scene') as HTMLCanvasElement, {
	debug: true
});

mach2.math.setImmediateScale(100, scene.id);
mach2.math.setPan(0, 50, scene.id);

const colors = [
	mach2.color.lightBlue,
	mach2.color.lightGreen,
	mach2.color.lightRed,
	mach2.color.lightYellow,
	mach2.color.lightPurple,
	mach2.color.lightOrange,
	mach2.color.lightPink
];

let shift = 0;

const waves = [
	(x: number) => Math.sin(x - shift),
	(x: number) => Math.cos((x - shift) / 2),
	(x: number) => Math.sin((x - shift) / 3) * 1.2,
	(x: number) => Math.cos((x - shift) * 2) / 2
];

const added = (x: number) => waves.reduce((acc, wave) => acc + wave(x), 0);

const colorLatex = await mach2.latex.createLatexRenderingContext(
	scene.ctx,
	`f(x) = \\color{${mach2.color.parseColor(colors[0], true)}}{\\sin(x)} + \\color{${mach2.color.parseColor(colors[1], true)}}{\\cos\\Bigl(\\frac{x}{2}\\Bigr)} + \\color{${mach2.color.parseColor(
		colors[2],
		true
	)}}{\\sin\\Bigl(\\frac{x}{3}\\Bigr)} + \\color{${mach2.color.parseColor(colors[3], true)}}{\\cos(2x)}`
);
const allLatex = await mach2.latex.createLatexRenderingContext(
	scene.ctx,
	'f(x) = \\sin(x) + \\cos\\Bigl(\\frac{x}{2}\\Bigr) + \\sin\\Bigl(\\frac{x}{3}\\Bigr) + \\cos(2x)'
);

scene.add(
	new (class extends mach2.Dynamic {
		waves = waves.map((wave, i) =>
			mach2.animation.createTransformable(
				[added, mach2.color.objectOpacity(mach2.color.white, 0.5), 2],
				[(x: number) => wave(x) + i * 4, colors[i], 2]
			)
		);
		opacities = mach2.animation.createAnimatable({
			all: 1,
			each: 0
		});

		public async update() {
			shift = this.frame / 20;

			if (this.ctx === null) {
				throw new Error('CanvasRenderingContext2D is null');
			}

			const latexPoint = scene.d2c(20, window.innerHeight - 20);

			allLatex.render(
				...latexPoint,
				mach2.color.opacity(mach2.color.white, this.opacities().all),
				'right',
				'top'
			);
			colorLatex.render(
				...latexPoint,
				mach2.color.opacity(mach2.color.white, this.opacities().each),
				'right',
				'top'
			);

			mach2.graph.axis(this.ctx, 0.4);

			for (const wave of this.waves) {
				wave.render(this.ctx);
			}
		}

		public sequence(i: number) {
			this.waves.forEach((wave) => wave.next());

			if (i % 2 === 0) {
				this.opacities.set({ all: 0, each: 1 });
			} else {
				this.opacities.set({ all: 1, each: 0 });
			}
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
