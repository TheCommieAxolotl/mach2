/**
 * Map a number from one range to another.
 */
export const map = (x: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
