import { Scene } from "~/lifecycle";
import { setScale } from "~/math";

export class SceneObject {
    public id = 0;
    public ctx: CanvasRenderingContext2D | null;
    public deltaTime: number;
    public frame: number;
    public scene: Scene | null;
    public jobs: (() => void)[] = [];
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

    _init(ctx: CanvasRenderingContext2D, deltaTime: number, frame: number, scene: Scene) {
        this.ctx = ctx;
        this.deltaTime = deltaTime;
        this.frame = frame;
        this.scene = scene;
    }

    _beforeUpdate(deltaTime: number, frame: number) {
        this.deltaTime = deltaTime;
        this.frame = frame;
    }
}
