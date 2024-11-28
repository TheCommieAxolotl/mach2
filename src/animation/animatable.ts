import { lerp } from '~/math';

type AnimatablePrimitive = number | number[] | Record<string | number | symbol, number>;

export type Animatable<P> = {
	(): P;
	set: (value: P, lerpFactor?: number) => void;
	setImmediate: (value: P) => void;
};

/**
 * Creates an animatable value.
 *
 * @param initialValue {P}
 * @returns {Animatable<P>}
 */
export const createAnimatable = <P extends AnimatablePrimitive>(
	initialValue: P,
	precision = 0.001
): Animatable<P> => {
	let value = initialValue;
	let targetValue = initialValue;
	let inLoop = false;

	const animatable = () => value;

	animatable.set = (newValue: P, lerpFactor = 0.05) => {
		targetValue = newValue;

		const loop = (r?: boolean) => {
			if (inLoop && !r) return;

			inLoop = true;

			if (typeof value === 'number' && typeof targetValue === 'number') {
				(value as number) = lerp(value, targetValue, lerpFactor);

				if (Math.abs((value as number) - targetValue) > precision) {
					requestAnimationFrame(loop.bind(null, true));
				} else {
					value = targetValue;
					inLoop = false;
				}
			} else if (Array.isArray(value) && Array.isArray(targetValue)) {
				for (let i = 0; i < value.length; i++) {
					value[i] = lerp(value[i], targetValue[i], lerpFactor);
				}

				if (value.some((v, i) => Math.abs(v - (targetValue as number[])[i]) > precision)) {
					requestAnimationFrame(loop.bind(null, true));
				} else {
					value = targetValue;
					inLoop = false;
				}
			} else {
				for (const key in value) {
					if (typeof value[key] === 'number' && typeof targetValue[key] === 'number') {
						(value as Record<string, number>)[key] = lerp(
							(value as Record<string, number>)[key],
							(targetValue as Record<string, number>)[key],
							lerpFactor
						);
					}
				}

				if (
					Object.keys(value).some(
						(key) =>
							Math.abs(
								(value as Record<string, number>)[key] -
									(targetValue as Record<string, number>)[key]
							) > precision
					)
				) {
					requestAnimationFrame(loop.bind(null, true));
				} else {
					value = targetValue;
					inLoop = false;
				}
			}

			inLoop = false;
		};

		loop();
	};

	animatable.setImmediate = (newValue: P) => {
		targetValue = newValue;
		value = newValue;
	};

	return animatable;
};
