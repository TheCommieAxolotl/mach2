import 'katex/dist/katex.min.css';
import mach2 from 'mach2';

const scene = mach2.scene3d(document.querySelector('canvas#scene') as HTMLCanvasElement, {
	debug: true
});

const sigma = 10;
const rho = 28;
const beta = 8 / 3;

function lorenz([x, y, z]: [number, number, number]): [number, number, number] {
	const dx = sigma * (y - x);
	const dy = x * (rho - z) - y;
	const dz = x * y - beta * z;
	return [dx, dy, dz];
}

function rk4(
	f: (state: [number, number, number]) => [number, number, number],
	state: [number, number, number],
	dt: number
): [number, number, number] {
	const k1 = f(state);
	const k2 = f(state.map((v, i) => v + (dt / 2) * k1[i]) as [number, number, number]);
	const k3 = f(state.map((v, i) => v + (dt / 2) * k2[i]) as [number, number, number]);
	const k4 = f(state.map((v, i) => v + dt * k3[i]) as [number, number, number]);

	return state.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])) as [
		number,
		number,
		number
	];
}

const states: [number, number, number][] = [
	[1, 1, 0],
	[2, 1, 0],
	[1, 2, 0],
	[1, 1, 2]
];

const colors = [
	mach2.color.lightBlue,
	mach2.color.lightGreen,
	mach2.color.lightRed,
	mach2.color.lightYellow
];

const diff1 = await mach2.latex.createLatexRenderingContext(
	scene.ctx,
	'\\frac{dx}{dt} = \\sigma(y - x)'
);
const diff2 = await mach2.latex.createLatexRenderingContext(
	scene.ctx,
	'\\frac{dy}{dt} = x(\\rho - z) - y'
);
const diff3 = await mach2.latex.createLatexRenderingContext(
	scene.ctx,
	'\\frac{dz}{dt} = xy - \\beta z'
);

const points: [number, number, number][][] = [];

scene.add(
	new (class extends mach2.Dynamic {
		public async update() {
			if (this.ctx === null) {
				throw new Error('CanvasRenderingContext2D is null');
			}

			const latexPoint1 = scene.d2c(20, window.innerHeight - 20);
			const latexPoint2 = scene.d2c(20, window.innerHeight - 70);
			const latexPoint3 = scene.d2c(20, window.innerHeight - 120);

			diff1.render(...latexPoint1, 'white', 'right', 'top');
			diff2.render(...latexPoint2, 'white', 'right', 'top');
			diff3.render(...latexPoint3, 'white', 'right', 'top');

			mach2.three.graph.axis(this.ctx, 100);

			for (let i = 0; i < states.length; i++) {
				const state = states[i];

				states[i] = rk4(lorenz, state, this.deltaTime / 1000);

				points[i] ??= [];
				points[i].push(states[i]);

				mach2.three.draw.point(this.ctx, states[i], colors[i]);
				mach2.three.graph.segment(this.ctx, points[i], colors[i]);
			}
		}
	})()
);

scene.start();
