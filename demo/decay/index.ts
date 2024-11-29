import mach2 from 'mach2';

const runSimulation = (atomCount = 1000, probability = 0.01) => {
	const scene = mach2.scene(document.querySelector('canvas#scene') as HTMLCanvasElement, {
		debug: true,
		interactive: false
	});

	class Atom extends mach2.Dynamic {
		decayed = false;
		probability = probability;

		constructor(
			public x: number,
			public y: number
		) {
			super();
		}

		public update() {
			if (this.ctx === null) {
				throw new Error('CanvasRenderingContext2D is null');
			}

			if (Math.random() < this.probability) {
				this.decayed = true;
			}

			if (this.decayed) return;

			const p = scene.p2c(this.x * this.ctx.canvas.width, this.y * this.ctx.canvas.height);

			mach2.draw.circle(
				this.ctx,
				p[0],
				p[1],
				5,
				`hsl(${this.id * 360} ${this.id * 100}% ${this.id * 360}% / 50%)`
			);
		}
	}

	const atoms = new Set<Atom>();

	for (let i = 0; i < atomCount; i++) {
		atoms.add(new Atom(Math.random(), Math.random()));
	}

	scene.add(
		new (class extends mach2.Static {
			public mount() {
				if (this.ctx === null) {
					throw new Error('CanvasRenderingContext2D is null');
				}

				this.ctx.fillStyle = 'black';
				this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			}
		})(),
		...atoms
	);

	scene.start();

	const graph = document.querySelector('canvas#graph') as HTMLCanvasElement;

	const graphData: number[] = [];

	const graphScene = mach2.scene(graph, {
		debug: true
	});

	graphScene.add(
		new (class extends mach2.Dynamic {
			public update() {
				const decayed = Array.from(atoms).filter((atom) => atom.decayed).length;

				if (decayed === atomCount) {
					this.scene?.stop();
					console.log('All atoms have decayed in' + this.frame + ' frames');
				}

				graphData.push(decayed);

				if (!this.ctx) {
					throw new Error('CanvasRenderingContext2D is null');
				}

				this.ctx.clearRect(0, 0, graph.width, graph.height);

				this.ctx.fillStyle = 'black';
				this.ctx.fillRect(0, 0, graph.width, graph.height);

				this.ctx.fillStyle = '#00ff0099';

				for (let i = 0; i < graphData.length; i++) {
					const x = i;
					const y = graphData[i] * (this.ctx.canvas.height / atomCount);

					this.ctx.fillRect(x, y, 1, this.ctx.canvas.height - y);
				}

				if (graphData.length > graph.width) {
					graphData.shift();
				}

				let prevY = 0;

				mach2.graph.fn(
					this.ctx,
					() => {
						prevY = mach2.math.lerp(
							prevY,
							this.ctx!.canvas.height,
							probability / Number(this.ctx?.canvas.dataset.resolution || '1')
						);

						return scene.p2c(0, prevY)[1];
					},
					'red',
					2
				);

				prevY = 0;

				this.ctx.fillStyle = 'white';
				this.ctx.font = '16px monospace';
				this.ctx.fillText(
					`${(decayed / atomCount).toFixed(3)} / ${((atomCount - decayed) / atomCount).toFixed(3)}`,
					32,
					32
				);
				this.ctx.fillText(`${atomCount} atoms`, 32, 48);
			}
		})()
	);

	graphScene.start();

	return () => {
		scene.stop();
		graphScene.stop();

		scene.destroy();
		graphScene.destroy();
	};
};

let cleanup = runSimulation();

const atomCountInput = document.querySelector('input#atomCount') as HTMLInputElement;

const updateSimulation = () => {
	cleanup();
	cleanup = runSimulation(parseInt(atomCountInput.value));
};

atomCountInput.addEventListener('change', updateSimulation);

const resetButton = document.querySelector('button#reset') as HTMLButtonElement;

resetButton.addEventListener('click', updateSimulation);
