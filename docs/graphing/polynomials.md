---
outline: deep
---

# Polynomials

A polynomial is a mathematical expression that consists of variables and coefficients, and is made up of one or more terms. Each term is a product of a coefficient and a variable raised to a power. For example, the polynomial $3x^2 + 2x + 1$ has three terms: $3x^2$, $2x$, and $1$.

## Graphing

Mach2 provides three functions for graphing polynomials: `mach2.graph.polynomial`, `mach2.graph.polynomialFromRoots`, and `mach2.graph.polynomialFromPoints`.

### `mach2.graph.polynomial`

The `mach2.graph.polynomial` function takes a number of coefficients, and graphs the polynomial defined by those coefficients. The coefficients are in order of decreasing power, so the first coefficient is the coefficient of the highest power term, the second coefficient is the coefficient of the next highest power term, and so on.

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.polynomial(this.ctx, [1, 0, -1], mach2.color.red, 4);
```

Will graph the polynomial $x^2 - 1$:

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

### `mach2.graph.polynomialFromRoots`

The `mach2.graph.polynomialFromRoots` function takes a list of roots, and graphs the polynomial that has those roots. The roots are the values of $x$ that make the polynomial equal to zero.

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// --cut-before--
mach2.graph.polynomialFromRoots(this.ctx, [2, 1, -1], mach2.color.blue, 4);
```

Will graph the polynomial $(x - 2)(x - 5)(x + 1)$:

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

### `mach2.graph.polynomialFromPoints`

The `mach2.graph.polynomialFromPoints` function takes a list of points, and graphs the polynomial that passes through those points. The points are given as an array of arrays, where each sub-array contains an $x$ and a $y$ value.

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// --cut-before--
mach2.graph.polynomialFromPoints(this.ctx, [
    [0, 1],
    [1, 0],
    [2, 1],
    [3, 0],
    [4, 1]
], mach2.color.pink, 4);
```

Will graph the polynomial which passes through the points $(0, 1)$, $(1, 0)$, $(2, 1)$, $(3, 0)$, and $(4, 1)$:

<div class="canvas">
    <canvas class="mach2" id="example3"></canvas>
</div>

    
<script setup>
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

                        mach2.graph.polynomial(this.ctx, [1, 0, -1], mach2.color.red, 4, undefined, undefined, undefined, foreground);
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

                        mach2.graph.polynomialFromRoots(this.ctx, [2, 1, -1], mach2.color.blue, 4);

                        mach2.graph.point(this.ctx, 2, 0, mach2.color.blue, undefined, undefined, 'bottom', foreground);
                        mach2.graph.point(this.ctx, 1, 0, mach2.color.blue, undefined, undefined, undefined, foreground);
                        mach2.graph.point(this.ctx, -1, 0, mach2.color.blue, undefined, undefined, 'bottom', foreground);
                    }
                }
            );

            scene.start();
        }

        const canvas3 = document.getElementById('example3');

        if (canvas3) {
            const scene = mach2.scene(canvas3, {
                background: bg
            });

            scene.add(
                new class extends mach2.Static {
                    mount() {
                        if (!this.ctx) return;

                        mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                        mach2.graph.polynomialFromPoints(this.ctx, [
                            [0, 1],
                            [1, 0],
                            [2, 1],
                            [3, 0],
                            [4, 1]
                        ], mach2.color.pink, 4);

                        mach2.graph.point(this.ctx, 0, 1, mach2.color.pink, undefined, 'left', 'bottom', foreground);
                        mach2.graph.point(this.ctx, 1, 0, mach2.color.pink, undefined, undefined, 'bottom', foreground);
                        mach2.graph.point(this.ctx, 2, 1, mach2.color.pink, undefined, undefined, 'top', foreground);
                        mach2.graph.point(this.ctx, 3, 0, mach2.color.pink, undefined, 'left', undefined, foreground);
                        mach2.graph.point(this.ctx, 4, 1, mach2.color.pink, undefined, undefined, 'bottom', foreground);
                    }
                }
            );

            scene.start();
        }
    }, 0);
</script>

