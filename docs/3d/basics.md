---
outline: deep
---

# 3D Basics

Extend Mach2 into another dimension.

## 3D Scenes

[View Source](https://github.com/TheCommieAxolotl/mach2/blob/main/src/3d/scene.ts)

To create a scene, simply call `mach2.scene3d(canvas: HTMLCanvasElement)`. This will create a new scene that will render to the given canvas element.

```ts twoslash
import mach2 from 'mach2';

// Get the canvas element from the DOM
const canvas = document.getElementById('canvas');

// Create a new scene
const scene = mach2.scene3d(canvas as HTMLCanvasElement); // [!code highlight]
```

### 3D Axis

You may be used to `mach2.graph.axis` in a 2d scene, which is nearly the same as `mach2.three.graph.axis`, however an additional argument *must* be supplied to tell mach2 how far into the distance to render the axes (including $(0,0,0)$).

Note how this example terminates at 5 units from the origin:
```ts twoslash
import mach2 from 'mach2';

// @ts-ignore
// ---cut-before---
mach2.three.graph.axis(this.ctx, 6);
```

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

## Functions in the 3rd Dimension

[View Source](https://github.com/TheCommieAxolotl/mach2/blob/main/src/3d/graph/function.ts)

### 3D Functions ($f(x,y)\to{z}$)

The `mach2.three.graph.fn2` utilitiy allows you to plot a meshed function in 3D space. The function is passed as a lambda with an x and y parameter, and the bounds are specified by the third argument.

```ts twoslash
import mach2 from 'mach2';

// @ts-ignore
// ---cut-before---
mach2.three.graph.fn2(this.ctx, (x,y) => Math.sin(x)+Math.cos(y), 6, mach2.color.green);
```

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

### 2D Functions on the 3D Plane ($f(x)\to{y}$)

The `mach2.three.graph.fn` utilitiy allows you to plot a normal 2D function on the 3D plane. The function is passed as a lambda with an x parameter, and the bounds are specified by the third argument. You can also change the line weight and offset along the z axis.

```ts twoslash
import mach2 from 'mach2';

// @ts-ignore
// ---cut-before---
mach2.three.graph.fn(this.ctx, (x) => Math.sin(x), 6, mach2.color.green, null, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example3"></canvas>
</div>


<script setup>
    import mach2 from 'mach2';
    import { onMounted } from 'vue'

    mach2.three.render.setCamera(20, 20, 20);

    onMounted(() => {
        // vue will await this script, so we need to async load the canvas
        setTimeout(() => {
            const canvas = document.getElementById('example1');

            if (canvas) {
                const scene = mach2.scene3d(canvas);

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

			                mach2.three.graph.axis(this.ctx, 6);
                        }
                    }
                );

                scene.start();
            }

            const canvas1 = document.getElementById('example2');

            if (canvas1) {
                const scene = mach2.scene3d(canvas1);

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

			                mach2.three.graph.axis(this.ctx, 6);
                            
                            mach2.three.graph.fn2(this.ctx, (x,y) => Math.sin(x)+Math.cos(y), 6, mach2.color.green);
                        }
                    }
                );

                scene.start();
            }
            
            const canvas2 = document.getElementById('example3');

            if (canvas2) {
                const scene = mach2.scene3d(canvas2);

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

			                mach2.three.graph.axis(this.ctx, 6);
                            
                            mach2.three.graph.fn(this.ctx, (x) => Math.sin(x), 6, mach2.color.green, 4, 4);
                        }
                    }
                );

                scene.start();
            }
        }, 0)
    })
</script>
