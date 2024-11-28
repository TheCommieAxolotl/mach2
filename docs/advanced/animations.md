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
    new class extends mach2.Dynamic {
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
    }
);
```

Calling the `.set()` method on an animatable will set the value of the animatable to the value passed in. Under the hood, this will be calculated using a frame-wise lerp with a default factor of `0.05`.

There is also `.setImmediate()` which will set the value immediately without any interpolation.

## Transformables

In order to smoothly transition between functions, you can use the `mach2.animation.createTransformable` utility:

```ts twoslash {7-10}
import mach2 from 'mach2';
const canvas = document.getElementById('canvas');
const scene = mach2.scene(canvas as HTMLCanvasElement);
// ---cut-before---
scene.add(
    new class extends mach2.Dynamic {
        graph = mach2.animation.createTransformable([
            [(x: number) => x, 0, mach2.color.red, 2],
            [(x: number) => x ** 2, mach2.color.green, 4]
        ]);

        update() {
            if (!this.ctx) return;

            mach2.graph.axis(this.ctx);

            this.graph.render(this.ctx)
        }

        // We will discuss sequences and events later
        sequence() {
            this.graph.next(); // [!code highlight]
        }
    }
);
```