/**
 * Linearly interpolates between two values.
 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Inverse linear interpolation.
 */
export const invlerp = (a: number, b: number, v: number) => (v - a) / (b - a);

/**
 * Half-life based linear interpolation.
 */
export const hlLerp = (a: number, b: number, deltaTime: number, halfLife: number) => {
    return b + (a - b) * Math.exp((-(deltaTime / 1000) / halfLife) * Math.LN2);
};
