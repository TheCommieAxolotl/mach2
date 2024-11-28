---
outline: deep
---

# Get Started

Mach2 is a speedy, lightweight, and typesafe canvas rendering and lifecycle management library.

## Installation

::: code-group

```sh [npm]
$ npm i -D mach2
```

```sh [pnpm]
$ pnpm add -D mach2
```

```sh [yarn]
$ yarn add -D mach2
```

```sh [bun]
$ bun add -D mach2
```

:::

### Optional Dependencies

Mach2 currently has one optional library you can install to enable additional features:

- [`katex`](https://katex.org) for rendering mathematical ([LaTeX](https://en.wikipedia.org/wiki/LaTeX)) expressions

::: code-group

```sh [npm]
$ npm i -D katex
```

```sh [pnpm]
$ pnpm add -D katex
```

```sh [yarn]
$ yarn add -D katex
```

```sh [bun]
$ bun add -D katex
```

:::

## Usage

Mach2 is designed to be used client-side. It relies on the `canvas` API, which is available in all modern browsers. Below is a simple example of how to use Mach2. Don't worry if you don't understand everything yet; we'll cover it all in the [API Documentation](/intro/basics).

```ts twoslash
import mach2 from 'mach2';

// Get the canvas element from the DOM
const canvas = document.getElementById('canvas');

// Create a new scene
const scene = mach2.scene(canvas as HTMLCanvasElement);

console.log('hello');

scene.add(
	// Create a dynamic object, which will update every frame
	new (class extends mach2.Dynamic {
		update() {
			if (!this.ctx) return;

			// Show a basic cartesian axis
			mach2.graph.axis(this.ctx);

			// Draw a basic function
			mach2.graph.fn(this.ctx, (x) => x ** 2, 'white', 4);
		}
	})()
);
```

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

<script setup>
    import mach2 from 'mach2';
    import { onMounted } from 'vue'

    onMounted(() => {
        // vue will await this script, so we need to async load the canvas
        setTimeout(() => {
            const canvas = document.getElementById('example1');

            if (canvas) {
                const scene = mach2.scene(canvas);

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            mach2.graph.axis(this.ctx)
                            mach2.graph.fn(this.ctx, (x) => x ** 2, 'white', 4)
                        }
                    }
                );

                scene.start();
            } else {
                console.error('Canvas element not found');
            }
        }, 0)
    })
</script>

## Next Steps

Now that you've got Mach2 installed and running, you can learn more about how to use it in the [API Documentation](/intro/basics).
