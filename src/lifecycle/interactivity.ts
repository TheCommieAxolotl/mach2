import { getTargetScale, pan, setScale } from '~/math';

export const registerEvents = (cavnas: HTMLCanvasElement, scroll: boolean, move: boolean) => {
	if (scroll)
		cavnas.addEventListener('wheel', (e) => {
			let targetScale = getTargetScale();

			if (e.deltaY > 0) {
				targetScale -= 1;

				if (targetScale < 1) {
					targetScale = 1;
				}
			} else {
				targetScale += 1;
			}

			if (targetScale < 1) {
				targetScale = 1;
			}

			setScale(targetScale);

			e.preventDefault();
		});

	if (move) {
		let isPanning = false;
		let initialMousePosition = { x: 0, y: 0 };

		cavnas.addEventListener('mousedown', (e) => {
			if (e.button === 0) {
				isPanning = true;
				initialMousePosition = { x: e.clientX, y: e.clientY };
			}
		});

		window.addEventListener('mouseup', (e) => {
			if (e.button === 0) {
				isPanning = false;
			}
		});

		window.addEventListener('mousemove', (e) => {
			if (isPanning) {
				pan(e.clientX - initialMousePosition.x, e.clientY - initialMousePosition.y);
				initialMousePosition = { x: e.clientX, y: e.clientY };
			}
		});
	}
};
