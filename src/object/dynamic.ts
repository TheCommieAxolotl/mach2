import { SceneObject } from "./object";

/**
 * A dynamic object.
 */
export class Dynamic extends SceneObject {
    constructor() {
        super();
    }

    public update(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    public sequence(i: number) {}
}
