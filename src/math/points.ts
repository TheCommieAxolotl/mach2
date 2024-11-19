export type Point = [number, number];

/**
 * Compute the pythagorean distance between two points.
 */
export const distance = (a: Point, b: Point) => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
