---
outline: deep
---

# Vectors

Vectors are a fundamental concept in mathematics, and are used in many different fields. In Mach2, a vector can be thought of as a line segment with a direction and a magnitude. Vectors are used to represent many different things, such as forces, velocities, and positions.

## Graphing

Instead of supplying the x and y components of a vector, you can graph a vector using the `mach2.graph.vector` function. This function takes a list of points, and draws line(s) between them. The first point is the tail of the vector, and the last point is the head of the vector.

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.vector(this.ctx, [
    [0, 0],
    [2, 4]
], mach2.color.red, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

You *can* create vectors by direction and magnitude using some basic trigonometry:
    
```ts twoslash
import mach2 from 'mach2';
// ---cut-before---
const magnitude = 5;
const direction = -Math.PI / 4;

const x = magnitude * Math.cos(direction);
const y = magnitude * Math.sin(direction);

// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.vector(this.ctx, [
    [0, 0],
    [x, y]
], mach2.color.yellow, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

<script>
    import mach2 from 'mach2';

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

                        mach2.graph.vector(this.ctx, [
                            [0, 0],
                            [2, 4]
                        ], mach2.color.red, 4);

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

                        const magnitude = 5;
                        const direction = -Math.PI / 4;

                        const x = magnitude * Math.cos(direction);
                        const y = magnitude * Math.sin(direction);

                        mach2.graph.vector(this.ctx, [
                            [0, 0],
                            [x, y]
                        ], mach2.color.yellow, 4);

                        mach2.graph.point(this.ctx, x, y, mach2.color.yellow, undefined, undefined, 'bottom', foreground);
                    }
                }
            );

            scene.start();
        }
    }, 0)
</script>
