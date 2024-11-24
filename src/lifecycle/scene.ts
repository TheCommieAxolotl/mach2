import { domToCartesian, setScale, setImmediateScale, cartesianToCanvas } from "~/math";
import { Dynamic, Static } from "~/object";
import { SceneObject } from "~/object/object";
import { registerEvents } from "./interactivity";
import { Color } from "~/shared";
import { parseColor } from "~/color";

export type SceneOptions = {
    debug: boolean;
    resolution: number;
    zoom: number;
    background: Color;
    interactivity:
        | boolean
        | {
              scroll: boolean;
              move: boolean;
          };
};

/**
 * Creates a scene.
 */
export const scene = (canvas: HTMLCanvasElement, options: Partial<SceneOptions> = {}): Scene => {
    const settings: SceneOptions = {
        debug: false,
        resolution: 2,
        zoom: 60,
        interactivity: true,
        background: "#000000",
        ...options,
    };

    setImmediateScale(settings.zoom);

    if (settings.debug) {
        console.log("Creating scene with canvas", canvas);
    }

    const objects = new Set<SceneObject>();

    const ctx = canvas.getContext("2d");

    if (ctx === null) {
        throw new Error("CanvasRenderingContext2D is null");
    }

    canvas.style.backgroundColor = parseColor(settings.background);

    let deltaTime = 0;
    let frame = 0;
    let sequenceStep = 0;
    let cartesianUnit = 1;

    const add = <T extends SceneObject[]>(...object: T) => {
        for (const obj of object) {
            objects.add(obj);
        }
    };

    const update = async () => {
        for (const object of objects) {
            object._beforeUpdate(deltaTime, frame, cartesianUnit);

            if (object instanceof Static || ("mount" in object && typeof object.mount === "function")) {
                await (object.mount as () => void)();
            }

            if (object instanceof Dynamic || ("update" in object && typeof object.update === "function")) {
                await (object.update as () => void)();
            }

            if (object instanceof Dynamic || ("jobs" in object && Array.isArray(object.jobs))) {
                for (const fn of object.jobs) {
                    await fn();
                }
            }
        }

        frame++;
    };

    const incrementSequence = () => {
        for (const object of objects) {
            if (object instanceof Dynamic || ("sequence" in object && typeof object.sequence === "function")) {
                (object.sequence as (i: number) => void)(sequenceStep);
            }
        }

        sequenceStep++;
    };

    let stopFlag = false;
    let then = performance.now();

    const loop = async () => {
        if (stopFlag) {
            return;
        }

        const now = performance.now();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        await update();

        deltaTime = now - then;
        then = now;

        cartesianUnit = (cartesianToCanvas(ctx, 1, 0)[0] - cartesianToCanvas(ctx, 0, 0)[0]) / settings.resolution;

        requestAnimationFrame(loop);
    };

    const start = () => {
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * settings.resolution;
        canvas.height = rect.height * settings.resolution;
        canvas.dataset.resolution = settings.resolution.toString();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cartesianUnit = (cartesianToCanvas(ctx, 1, 0)[0] - cartesianToCanvas(ctx, 0, 0)[0]) / settings.resolution;

        for (const object of objects) {
            object._init(ctx, deltaTime, frame, ret, cartesianUnit);
        }

        loop();
    };

    const listener = () => {
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * settings.resolution;
        canvas.height = rect.height * settings.resolution;
    };

    window.addEventListener("resize", listener);

    if (settings.interactivity) {
        const { scroll, move } = typeof settings.interactivity === "boolean" ? { scroll: true, move: true } : settings.interactivity;
        registerEvents(canvas, scroll, move);
    }

    const stop = () => {
        stopFlag = true;
    };

    const destroy = () => {
        stopFlag = true;
        objects.clear();
        window.removeEventListener("resize", listener);

        if (settings.debug) {
            console.log("Destroyed scene with canvas", canvas);
        }
    };

    let cbs: Record<string, Parameters<Scene["on"][keyof Scene["on"]]>[0][]> = {
        click: [] as Parameters<Scene["on"][keyof Scene["on"]]>[0][],
    };

    const click = (e: MouseEvent) => {
        const cartesian = domToCartesian(ctx, e.clientX, e.clientY);

        for (const cb of cbs.click) {
            cb(
                window.Object.assign(e, {
                    cartesian: {
                        x: cartesian[0],
                        y: cartesian[1],
                    },
                })
            );
        }
    };

    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            incrementSequence();
        }
    });

    canvas.addEventListener("click", click);

    const ret: Scene = {
        options: settings,
        add,
        start,
        stop,
        canvas,
        destroy,
        ctx,
        zoom: (target: number) => {
            setScale(target);
        },
        on: {
            click: (cb) => {
                cbs.click.push(cb as unknown as Parameters<Scene["on"][keyof Scene["on"]]>[0]);
            },
        },
    };

    return ret;
};

export type Scene = {
    add: <T extends SceneObject[]>(...objects: T) => void;
    start: () => void;
    stop: () => void;
    destroy: () => void;

    zoom: (target: number) => void;

    on: {
        click: (
            fn: (
                e: MouseEvent & {
                    cartesian: { x: number; y: number };
                }
            ) => void
        ) => void;
    };

    options: SceneOptions;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};
