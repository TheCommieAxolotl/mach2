import mach2 from 'mach2';
import { describe, expect, test } from 'vitest';

describe('Math and Conversions', () => {
	test('Pythagorean distance', () => {
		expect(mach2.math.distance([0, 0], [3, 4])).toBe(5);
		expect(mach2.math.distance([0, 0], [0, 0])).toBe(0);
		expect(mach2.math.distance([0, 0], [1, 1])).toBeCloseTo(Math.sqrt(2));
	});

	test('Degrees to radians', () => {
		expect(mach2.math.degToRad(0)).toBe(0);
		expect(mach2.math.degToRad(90)).toBeCloseTo(Math.PI / 2);
		expect(mach2.math.degToRad(180)).toBeCloseTo(Math.PI);
	});

	test('Radians to degrees', () => {
		expect(mach2.math.radToDeg(0)).toBe(0);
		expect(mach2.math.radToDeg(Math.PI / 2)).toBeCloseTo(90);
		expect(mach2.math.radToDeg(Math.PI)).toBeCloseTo(180);
	});

	test('Map values', () => {
		expect(mach2.math.map(0, 0, 1, 0, 100)).toBe(0);
		expect(mach2.math.map(0.5, 0, 1, 0, 100)).toBe(50);
		expect(mach2.math.map(1, 0, 1, 0, 100)).toBe(100);
	});

	test('Lerp', () => {
		expect(mach2.math.lerp(0, 100, 0)).toBe(0);
		expect(mach2.math.lerp(0, 100, 0.5)).toBe(50);
		expect(mach2.math.lerp(0, 100, 1)).toBe(100);
	});
});
