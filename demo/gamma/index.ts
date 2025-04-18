import 'katex/dist/katex.min.css';
import mach2 from 'mach2';

const scene = mach2.scene(document.querySelector('canvas#scene') as HTMLCanvasElement, {
	debug: true
});

mach2.math.setImmediateScale(122, scene.id);

const latex = await mach2.latex.createLatexRenderingContext(
	scene.ctx,
	'\\Gamma(x) = \\int_0^\\infty t^{x-1} e^{-t} dt'
);

const latex2 = await mach2.latex.createLatexRenderingContext(scene.ctx, '\\Gamma(x-1)');

const g = 7;
const p = [
	0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
	-176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
	1.5056327351493116e-7
];

const g_ln = 607 / 128;
const p_ln = [
	0.99999999999999709182, 57.156235665862923517, -59.597960355475491248, 14.136097974741747174,
	-0.49191381609762019978, 0.33994649984811888699e-4, 0.46523628927048575665e-4,
	-0.98374475304879564677e-4, 0.15808870322491248884e-3, -0.21026444172410488319e-3,
	0.2174396181152126432e-3, -0.16431810653676389022e-3, 0.84418223983852743293e-4,
	-0.2619083840158140867e-4, 0.36899182659531622704e-5
];

// Spouge approximation (suitable for large arguments)
function lngamma(z: number) {
	if (z < 0) return Number('0/0');
	var x = p_ln[0];
	for (var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
	var t = z + g_ln + 0.5;
	return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x) - Math.log(z);
}

const gamma = (z: number): number => {
	if (z < 0.5) {
		return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
	} else if (z > 100) return Math.exp(lngamma(z));
	else {
		z -= 1;
		var x = p[0];
		for (var i = 1; i < g + 2; i++) {
			x += p[i] / (z + i);
		}
		var t = z + g + 0.5;

		return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
	}
};

const nths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => [i, gamma(i)]);

scene.add(
	new (class extends mach2.Dynamic {
		public async update() {
			if (this.ctx === null) {
				throw new Error('CanvasRenderingContext2D is null');
			}

			const latexPoint1 = scene.d2c(30, window.innerHeight - 30);
			const latexPoint2 = scene.d2c(30, window.innerHeight - 80);

			latex.render(...latexPoint1, mach2.color.white, 'right', 'top');
			latex2.render(...latexPoint2, mach2.color.lightBlue, 'right', 'top');

			mach2.graph.axis(this.ctx, 0.4);

			mach2.graph.fn(this.ctx, (x) => gamma(x + 1), mach2.color.lightBlue, 2);

			for (const [i, point] of nths.entries()) {
				mach2.graph.point(this.ctx, point[0] - 1, point[1], mach2.color.red);
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
