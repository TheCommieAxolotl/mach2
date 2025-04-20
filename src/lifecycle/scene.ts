import { parseColor } from '~/color';
import {
	canvasToCartesian,
	cartesianToCanvas,
	domToCartesian,
	setImmediateScale,
	setScale
} from '~/math';
import { Dynamic, Static } from '~/object';
import { SceneObject } from '~/object/object';
import { Color } from '~/shared';

import { registerEvents } from './interactivity';

export type SceneOptions = {
	debug: boolean;
	resolution: number;
	zoom: number;
	background: Exclude<Color, CanvasGradient | CanvasPattern>;
	interactive:
		| boolean
		| {
				scroll: boolean;
				move: boolean;
		  };
};

export const getSceneId = (canvas: HTMLCanvasElement) => {
	const id = canvas.dataset.scene;

	if (id === undefined) {
		console.error('Scene ID not found, returning 0');

		return 0;
	}

	return Number(id);
};

let sceneId = 0;

/**
 * Creates a scene.
 */
export const scene = (canvas: HTMLCanvasElement, options: Partial<SceneOptions> = {}): Scene => {
	const SCENE_ID = sceneId++;

	canvas.dataset.scene = SCENE_ID.toString();

	const settings: SceneOptions = {
		debug: false,
		resolution: 2,
		zoom: 60,
		interactive: true,
		background: '#000000',
		...options
	};

	setImmediateScale(settings.zoom, SCENE_ID);

	if (settings.debug) {
		console.log('Creating scene with canvas', canvas);
	}

	const objects = new Set<SceneObject>();

	const ctx = canvas.getContext('2d');

	if (ctx === null) {
		throw new Error('CanvasRenderingContext2D is null');
	}

	canvas.style.backgroundColor = parseColor(settings.background) as string;

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

			if (
				object instanceof Static ||
				('mount' in object && typeof object.mount === 'function')
			) {
				await (object.mount as () => void)();
			}

			if (
				object instanceof Dynamic ||
				('update' in object && typeof object.update === 'function')
			) {
				await (object.update as () => void)();
			}

			if (object instanceof Dynamic || ('jobs' in object && Array.isArray(object.jobs))) {
				for (const fn of object.jobs) {
					await fn();
				}
			}
		}

		frame++;
	};

	const incrementSequence = () => {
		for (const object of objects) {
			if (
				object instanceof Dynamic ||
				('sequence' in object && typeof object.sequence === 'function')
			) {
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

		cartesianUnit =
			(cartesianToCanvas(ctx, 1, 0, SCENE_ID)[0] -
				cartesianToCanvas(ctx, 0, 0, SCENE_ID)[0]) /
			settings.resolution;

		requestAnimationFrame(loop);
	};

	const start = () => {
		const rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * settings.resolution;
		canvas.height = rect.height * settings.resolution;
		canvas.dataset.resolution = settings.resolution.toString();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		cartesianUnit =
			(cartesianToCanvas(ctx, 1, 0, SCENE_ID)[0] -
				cartesianToCanvas(ctx, 0, 0, SCENE_ID)[0]) /
			settings.resolution;

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

	window.addEventListener('resize', listener);

	if (settings.interactive) {
		const { scroll, move } =
			typeof settings.interactive === 'boolean' ?
				{ scroll: true, move: true }
			:	settings.interactive;
		registerEvents(canvas, scroll, move, SCENE_ID);
	}

	const stop = () => {
		stopFlag = true;
	};

	const destroy = () => {
		stopFlag = true;
		objects.clear();
		window.removeEventListener('resize', listener);

		if (settings.debug) {
			console.log('Destroyed scene with canvas', canvas);
		}
	};

	let cbs: Record<string, Parameters<Scene['on'][keyof Scene['on']]>[0][]> = {
		click: [] as Parameters<Scene['on'][keyof Scene['on']]>[0][]
	};

	const click = (e: MouseEvent) => {
		const cartesian = domToCartesian(ctx, e.clientX, e.clientY, SCENE_ID);

		for (const cb of cbs.click) {
			cb(
				window.Object.assign(e, {
					cartesian: {
						x: cartesian[0],
						y: cartesian[1]
					}
				})
			);
		}
	};

	window.addEventListener('keydown', (e) => {
		if (e.code === 'Space') {
			incrementSequence();
		}
	});

	canvas.addEventListener('click', click);

	const ret: Scene = {
		options: settings,
		id: SCENE_ID,
		add,
		start,
		objects,
		stop,
		canvas,
		destroy,
		ctx,
		zoom: (target: number) => {
			setScale(target, SCENE_ID);
		},
		on: {
			click: (cb) => {
				cbs.click.push(cb as unknown as Parameters<Scene['on'][keyof Scene['on']]>[0]);
			}
		},
		c2p: (x: number, y: number) => cartesianToCanvas(ctx, x, y, SCENE_ID),
		p2c: (x: number, y: number) => canvasToCartesian(ctx, x, y, SCENE_ID),
		d2c: (x: number, y: number) => domToCartesian(ctx, x, y, SCENE_ID)
	};

	return ret;
};

export type Scene = {
	add: <T extends SceneObject[]>(...objects: T) => void;
	start: () => void;
	stop: () => void;
	destroy: () => void;
	objects: Set<SceneObject>;

	zoom: (target: number) => void;

	c2p: (x: number, y: number) => [number, number];
	p2c: (x: number, y: number) => [number, number];
	d2c: (x: number, y: number) => [number, number];

	on: {
		click: (
			fn: (
				e: MouseEvent & {
					cartesian: { x: number; y: number };
				}
			) => void
		) => void;
	};

	id: number;
	options: SceneOptions;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
};
