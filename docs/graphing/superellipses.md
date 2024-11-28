---
outline: deep
---

# Superellipses

A superellipse is a generalisation of an ellipse that can be used to create a wide variety of shapes. The equation for a superellipse is:

<!-- |(x-k)/r_x|^d + |(y-h)/r_y|^d = 1 -->

$$ \left| \frac{x-k}{r_x} \right|^d + \left| \frac{y-h}{r_y} \right|^d = 1 $$

where $(k, h)$ is the center of the superellipse, $r_x$ and $r_y$ are the radii of the superellipse, and $d$ is the power that determines the shape of the superellipse. For $d = 2$, the superellipse is an ellipse. For $d = 1$, the superellipse is a rectangle. For $d = 4$, the superellipse is a squircle.

## Graphing

In Mach2, you can graph superellipses using the `mach2.graph.superellipse` function. The function takes the following arguments:

- `ctx`: The canvas rendering context.
- `k`: The x-coordinate of the center of the superellipse.
- `h`: The y-coordinate of the center of the superellipse.
- `radiusX`: The x-radius of the superellipse.
- `degree`: The power that determines the shape of the superellipse.
- `color`: The color of the superellipse.
- `weight`: The weight of the superellipse's stroke. (default: 1)
- `radiusY`: The y-radius of the superellipse. (default: `radiusX`)
- `bounds`: The bounds of the superellipse. (default: $2\pi$)
- `precision`: The precision of the superellipse. (default: 0.01)

```ts
import mach2 from 'mach2';

// @ts-ignore
// ---cut-before---
mach2.graph.superellipse(this.ctx, 0, 0, 5, 1, mach2.colors.green, 2);
// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.superellipse(this.ctx, 0, 0, 5, 2, mach2.colors.red, 2);
// ---cut-start---
// @ts-ignore
// ---cut-end---
mach2.graph.superellipse(this.ctx, 0, 0, 5, 4, mach2.colors.blue, 2);
```

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
                const scene2 = mach2.scene(canvas, {
                    background: bg
                });

                scene2.add(
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.superellipse(this.ctx, 0, 0, 5, 1, mach2.color.green, 2);
                            mach2.graph.superellipse(this.ctx, 0, 0, 5, 2, mach2.color.red, 2);
                            mach2.graph.superellipse(this.ctx, 0, 0, 5, 4, mach2.color.blue, 2);
                        }
                    }
                );

                scene2.start();
            }
        }, 0)
    })
</script>
