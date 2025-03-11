import * as three from './3d';
import * as threeScene from './3d/scene';
import * as animation from './animation';
import * as color from './color';
import * as draw from './draw';
import * as graph from './graph';
import * as latex from './latex';
import * as lifecycle from './lifecycle';
import * as math from './math';
import * as object from './object';

export default {
	...object,
	...lifecycle,
	...threeScene,
	three,
	math,
	draw,
	graph,
	color,
	latex,
	animation
};
