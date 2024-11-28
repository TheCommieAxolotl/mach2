---
outline: deep
---

# Animations

You've learnt all about how to create and style your visualisations, but what about animating them? Mach2 offers simple primitives to create motion, transitions and animations in your visualisations.

## Animatables

Mach2 treats anything coforming to the below type as an `AnimatablePrimitive`:

```ts twoslash
type AnimatablePrimitive = number | number[] | Record<string | number | symbol, number>;
```

e.g. a number, an array of numbers or an object with number values.

This means you can animate any property that is a number in itself, any `Color`, any `Point` or `Vector2`, ect.

### Creating Animatables

You can create an animatable by using the `mach2.animation.createAnimatable` utility:

::: warning
Animation primitives **must be created outside** of lifecycle methods like `update` or `mount`. They create their own update loop and if called inside lifecycle methods, will never update.
:::

```ts twoslash
import mach2 from 'mach2';

const canvas = document.getElementById('canvas');
const scene = mach2.scene(canvas as HTMLCanvasElement);
// ---cut-before---
scene.add(
	new (class extends mach2.Dynamic {
		intercept = mach2.animation.createAnimatable<number>(0); // [!code highlight]

		update() {
			if (!this.ctx) return;

			mach2.graph.axis(this.ctx);

			mach2.graph.linearFunction(this.ctx, 1, this.intercept(), 'white', 4);
		}

		// We will discuss sequences and events later
		sequence() {
			this.intercept.set(6); // [!code highlight]
		}
	})()
);
```

Calling the `.set()` method on an animatable will set the value of the animatable to the value passed in. Under the hood, this will be calculated using a frame-wise lerp with a default factor of `0.05`.

There is also `.setImmediate()` which will set the value immediately without any interpolation.

## Transformables

In order to smoothly transition between functions, you can use the `mach2.animation.createTransformable` utility:

```ts twoslash {3-6}
// @errors: 2322 2695 2739
import mach2 from 'mach2';

const canvas = document.getElementById('canvas');
const scene = mach2.scene(canvas as HTMLCanvasElement);
// ---cut-before---
scene.add(
	new (class extends mach2.Dynamic {
		graph = mach2.animation.createTransformable(
			[(x: number) => x, mach2.color.red, 2],
			[(x: number) => x ** 2, mach2.color.green, 4]
		);

		update() {
			if (!this.ctx) return;

			mach2.graph.axis(this.ctx);

			this.graph.render(this.ctx); // [!code highlight]
		}

		// We will discuss sequences and events later
		sequence() {
			this.graph.next(); // [!code highlight]
		}
	})()
);
```

This will create a transformable that will transition between the two functions passed in. The first element of the tuple is the function to transition to, the second is the `ObjectColor` to transition to and the third is the line weight of the function.

```ts twoslash
import mach2 from 'mach2';

// ---cut-before---
[(x: number) => x, mach2.color.red, 2];
```

### Transformable Methods

- `.next()` - Transitions to the next function in the list
- `.prev()` - Transitions to the previous function in the list
- `.swapTo(index: number)` - Transitions to the function at the index passed in
- `get color(): ObjectColor` - Returns the current color of the transformable
- `get weights(): number[]` - Returns the current weight of the transformable

## Sequences

Mach2 offers a built-in system to build complex visualisations that need to either transition between multiple states or respond to user input. This is done through the `sequence` method on a `Dynamic` object.

Every time you hit the "Activation Key" (default is <kbd>Space</kbd>), the `sequence` method will be called with the index of the sequence to run.

```ts twoslash
import mach2 from 'mach2';

const canvas = document.getElementById('canvas');
const scene = mach2.scene(canvas as HTMLCanvasElement);
// ---cut-before---
scene.add(
	new (class extends mach2.Dynamic {
		intercept = mach2.animation.createAnimatable<number>(0);

		update() {
			if (!this.ctx) return;

			mach2.graph.axis(this.ctx);

			mach2.graph.linearFunction(this.ctx, 1, this.intercept(), 'white', 4);
		}

		sequence(index: number) {
			this.intercept.set(index + 1); // [!code highlight]
		}
	})()
);
```

Try it out by pressing <kbd>Space</kbd>:

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

<script setup>
    import mach2 from 'mach2';
    import { onMounted } from 'vue'

    onMounted(() => {
        const darkmode = document.querySelector('html').classList.contains('dark');

        const bg = darkmode ? mach2.color.black : mach2.color.white;
        const foreground = darkmode ? mach2.color.white : mach2.color.black;

        // vue will await this script, so we need to async load the canvas
        setTimeout(() => {
            const canvas = document.getElementById('example1');

            if (canvas) {
                const scene = mach2.scene(canvas, {
                    background: bg
                });

                scene.add(
                    new class extends mach2.Dynamic {
                        intercept = mach2.animation.createAnimatable(0);

                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx);

                            mach2.graph.linearFunction(this.ctx, 1, this.intercept(), foreground, 4);
                        }

                        sequence(index) {
                            this.intercept.set(index + 1);
                        }
                    }
                );

                scene.start();
            }
        })
    })
</script>
