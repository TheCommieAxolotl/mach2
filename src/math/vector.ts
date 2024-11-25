import { Point } from "./points";

export class Vector2 extends Array<number> {
    constructor(x: number, y: number) {
        super(x, y);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    normalize() {
        const length = Math.sqrt(this[0] * this[0] + this[1] * this[1]);
        return new Vector2(this[0] / length, this[1] / length);
    }

    magnitude() {
        return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
    }

    add(v: Vector2) {
        return new Vector2(this[0] + v[0], this[1] + v[1]);
    }

    sub(v: Vector2) {
        return new Vector2(this[0] - v[0], this[1] - v[1]);
    }

    scale(s: number) {
        return new Vector2(this[0] * s, this[1] * s);
    }

    div(s: number) {
        return new Vector2(this[0] / s, this[1] / s);
    }

    dot(v: Vector2) {
        return this[0] * v[0] + this[1] * v[1];
    }

    cross(v: Vector2) {
        return this[0] * v[1] - this[1] * v[0];
    }

    point() {
        return [this[0], this[1]];
    }

    [Symbol.iterator]() {
        return this.values();
    }
}

export const vec2 = (x: number, y: number): Vector2 => new Vector2(x, y);

export const vec2FromPoints = (a: Point, b: Point): Vector2 => vec2(b[0] - a[0], b[1] - a[1]);
