import { SceneObject } from './object';

/**
 * A static object.
 */
export class Static extends SceneObject {
	constructor() {
		super();
	}

	public mount() {
		throw new Error('Method not implemented.');
	}

	public cleanup() {
		throw new Error('Method not implemented.');
	}
}
