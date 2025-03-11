import { camera, cameraRotation, setCamera, zoomIn } from './render/plot';

export const registerEvents = (canvas: HTMLCanvasElement) => {
	canvas.addEventListener('wheel', (e) => {
		zoomIn(e.deltaY > 0 ? 1 : -1);
	});

	let isDragging = false;
	let lastX = 0;
	let lastY = 0;

	canvas.addEventListener('mousedown', (e) => {
		isDragging = true;
		lastX = e.clientX;
		lastY = e.clientY;
	});

	canvas.addEventListener('mouseup', () => {
		isDragging = false;
	});

	canvas.addEventListener('mousemove', (e) => {
		if (!isDragging) {
			return;
		}

		const [cx, cy, cz] = camera;

		const distance = Math.sqrt(cx * cx + cy * cy + cz * cz);

		const [yaw, pitch] = cameraRotation;

		const dxr = -1 * (e.clientX - lastX);
		const dyr = e.clientY - lastY;

		const dyRadians = (dyr / canvas.height) * Math.PI;
		const dxRadians = (dxr / canvas.width) * Math.PI;

		const newPitch = pitch + dyRadians;
		const newYaw = yaw + dxRadians;

		const newCosYaw = Math.cos(newYaw);
		const newSinYaw = Math.sin(newYaw);
		const newCosPitch = Math.cos(newPitch);

		const newDz = distance * newCosYaw * newCosPitch;
		const newDx = distance * newSinYaw * newCosPitch;
		const newDy = distance * Math.sin(newPitch);

		const newCx = newDx;
		const newCy = newDy;
		const newCz = newDz;

		setCamera(newCx, newCy, newCz);

		lastX = e.clientX;
		lastY = e.clientY;
	});
};
