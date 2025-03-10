import { Point } from '~/math';

export let camera = [100, 100, 100] as [number, number, number];
export let cameraRotation = [0, 0, 0];
export let target = [0, 0, 0] as [number, number, number];
let perspective = 1500;

export const setCamera = (x: number, y: number, z: number): void => {
	camera = [x, y, z];
};

export const setCameraRotation = (yaw: number, pitch: number, roll: number): void => {
	cameraRotation = [yaw, pitch, roll];
};

export const setPerspective = (p: number): void => {
	perspective = p;
};

export const setTarget = (x: number, y: number, z: number): void => {
	target = [x, y, z];
};

export const lookAtTarget = () => {
	const [cx, cy, cz] = camera;
	const [tx, ty, tz] = target;

	const dx = -1 * (tx - cx);
	const dy = -1 * (ty - cy);
	const dz = -1 * (tz - cz);

	const yaw = Math.atan2(dx, dz);
	const pitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));

	setCameraRotation(yaw, pitch, 0);
};

lookAtTarget();

export const zoomIn = (amount: number): void => {
	const [cx, cy, cz] = camera;
	const [yaw, pitch, roll] = cameraRotation;

	const cosYaw = Math.cos(yaw);
	const sinYaw = Math.sin(yaw);
	const cosPitch = Math.cos(pitch);

	const dz = amount * cosYaw * cosPitch;
	const dx = amount * sinYaw * cosPitch;
	const dy = amount * Math.sin(pitch);

	camera = [cx + dx, cy + dy, cz + dz];
};

export const projectPoint = (
	ctx: CanvasRenderingContext2D,
	px: number,
	py: number,
	pz: number
): Point | null => {
	const [cx, cy, cz] = camera;
	const [yaw, pitch, roll] = cameraRotation;

	let tx = px - cx;
	let ty = py - cy;
	let tz = pz - cz;

	const cosYaw = Math.cos(yaw);
	const sinYaw = Math.sin(yaw);
	const xz = tx * cosYaw - tz * sinYaw;
	tz = tx * sinYaw + tz * cosYaw;
	tx = xz;

	const cosPitch = Math.cos(pitch);
	const sinPitch = Math.sin(pitch);
	const yz = ty * cosPitch - tz * sinPitch;
	tz = ty * sinPitch + tz * cosPitch;
	ty = yz;

	const cosRoll = Math.cos(roll);
	const sinRoll = Math.sin(roll);
	const xy = tx * cosRoll - ty * sinRoll;
	ty = tx * sinRoll + ty * cosRoll;
	tx = xy;

	if (tz >= 0) return null;

	const scale = perspective / -tz;
	const x2D = tx * scale;
	const y2D = ty * scale;

	const canvasX = ctx.canvas.width / 2 + x2D;
	const canvasY = ctx.canvas.height / 2 - y2D;

	return [canvasX, canvasY];
};
