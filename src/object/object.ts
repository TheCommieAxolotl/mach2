import { Scene } from '~/lifecycle';
import { setScale } from '~/math';

export class SceneObject {
	public id = 0;
	public ctx: CanvasRenderingContext2D | null;
	public deltaTime: number;
	public frame: number;
	public scene: Scene | null;
	public jobs: (() => void)[] = [];
	public cU: number = 1;
	protected onceCalls = new Set<string>();

	constructor() {
		this.id = Math.random();

		this.ctx = null;
		this.deltaTime = 0;
		this.frame = 0;
		this.scene = null;
	}

	public once(fn: () => void) {
		if (this.onceCalls.has(fn.toString())) return;

		this.onceCalls.add(fn.toString());

		fn();
	}

	public zoom(target: number) {
		setScale(target);
	}

	_init(
		ctx: CanvasRenderingContext2D,
		deltaTime: number,
		frame: number,
		scene: Scene,
		cartesianUnit: number
	) {
		this.ctx = ctx;
		this.deltaTime = deltaTime;
		this.frame = frame;
		this.scene = scene;
		this.cU = cartesianUnit;
	}

	_beforeUpdate(deltaTime: number, frame: number, cartesianUnit: number) {
		this.deltaTime = deltaTime;
		this.frame = frame;
		this.cU = cartesianUnit;
	}
}
