# mach2

A speedy, lightweight, and typesafe canvas rendering and lifecycle management library.

![Three windows are open in a grid layout. The leftmost window shows the graphs of three trigonometric functions, the top right window shows a half-life graph modelling the decay of atoms, and the lower right window shows a rendering of the Mandelbrot set.](./assets//demo.png)

> Graphs of $\sin(x)$, $\cos(x)$, and $\sin(x)+\cos(x)$.
> Half-life graph of a radioactive substance, and the Mandelbrot set.

## Features

- **Mathematical Rendering**: Provides a multitude of mathematical functions for rendering, and allows you to graph them with ease.
- **Lifecycle Management**: Manages your canvas' rendering lifecycle for you, so you can focus on what you want to draw.
- **Lightweight**: Weighing in at just 11KB, mach2 is a lightweight library that won't slow down your website.
- **Typesafe**: Written in TypeScript, mach2 provides type safety for your canvas rendering.
- **Easy Animation**: Provides simple primitives for animations, so you can animate your renderings.

## Installation

```bash
pnpm add mach2
npm i mach2
bun i mach2
```

Optionally, you can add [KaTeX](https://katex.org/) to render LaTeX expressions.

```bash
pnpm add katex
npm i katex
bun i katex
```

## Usage

```typescript
import mach2 from 'mach2';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

// create a scene
const scene = mach2.scene(canvas);

scene.add([
    // add a new static object
    new class extends mach2.Static {
        mount() {
            // render cartesian axis
            mach2.graph.axis(this.ctx);

            // graph a parabola
            mach2.graph.fn(this.ctx, (x) => x**2, 'red', 2);
        }
    }
])
```