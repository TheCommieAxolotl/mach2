---
outline: deep
---

# Vectors

Vectors are a fundamental concept in mathematics, and are used in many different fields. In Mach2, a vector can be thought of as a line segment with a direction and a magnitude. Vectors are used to represent many different things, such as forces, velocities, and positions.

## Graphing

To create a vector in Mach2, you can use the `mach2.math.vec2` function. This function takes two arguments: the x and y components of the vector. For example, to create a vector with an x component of 2 and a y component of 4, you would write:

```ts twoslash
import mach2 from 'mach2';
// ---cut-before---
const vec = mach2.math.vec2(2, 4);
```

Once you have created a vector, you can graph it using the `mach2.graph.vector` function. This function takes four arguments: the canvas context, the start point of the vector, the end point of the vector, and the color of the vector. For example, to graph the vector created above, you would write:

```ts twoslash
import mach2 from 'mach2';
// ---cut-before---
const vec = mach2.math.vec2(2, 4);

// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.vector(this.ctx, [0,0], vec, mach2.color.red, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

## Modifying Vectors

A Mach2 vector object contains a few useful methods for modifying the vector. For example, you can add two vectors together using the `add` method:

```ts twoslash
import mach2 from 'mach2';
// ---cut-before---
const vec1 = mach2.math.vec2(0, 5);
const vec2 = mach2.math.vec2(-3, 0);

const result = vec1.add(vec2);

// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.vector(this.ctx, [0,0], vec1, mach2.color.red, 4);
// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.vector(this.ctx, vec1, vec2, mach2.color.blue, 4);
// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.vector(this.ctx, [0,0], result, mach2.color.green, 4);
```

::: tip

See how we can pass a vector as a point to the `mach2.graph.vector` function? This is because a `Vector2` object contains a `[Symbol.iterator]` method that allows it to be used like a `Point`.

However, this may cause a type error in TypeScript. To fix this, you can use `vec.point()` to get the point representation of the vector.

:::

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

## Vector Operations

The following operations are available on a `Vector2` object:

- `add`: Adds two vectors together.
- `sub`: Subtracts one vector from another.
- `scale`: Multiplies a vector by a scalar.
- `div`: Divides a vector by a scalar.
- `dot`: Calculates the dot product of two vectors.
- `cross`: Calculates the cross product of two vectors.
- `magnitude`: Calculates the magnitude of the vector.
- `normalize`: Normalizes the vector (i.e., makes it a unit vector).

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
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            const vec = mach2.math.vec2(2, 4);

                            mach2.graph.vector(this.ctx, [0, 0], vec, mach2.color.red, 4);

                            mach2.graph.point(this.ctx, 2, 4, mach2.color.red, undefined, undefined, undefined, foreground);
                        }
                    }
                );

                scene.start();
            }

            const canvas2 = document.getElementById('example2');

            if (canvas2) {
                const scene = mach2.scene(canvas2, {
                    background: bg
                });

                scene.add(
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            const vec1 = mach2.math.vec2(0, 5);
                            const vec2 = mach2.math.vec2(-3, 0);

                            const result = vec1.add(vec2);

                            

                            mach2.graph.vector(this.ctx, [0, 0], vec1, mach2.color.red, 4);
                            mach2.graph.vector(this.ctx, vec1, vec2, mach2.color.blue, 4);
                            mach2.graph.vector(this.ctx, [0, 0], result, mach2.color.green, 4);
                        }
                    }
                );

                scene.start();
            }
        }, 0)
    })
</script>
