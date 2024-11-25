---
outline: deep
---

# Functions

Mach2 comes with a variety of function-graphing utilities to help you visualise mathematical functions and expressions. These utilities are designed to be simple to use, and provide a variety of options for customisation (e.g. color and line weight).

::: tip

All of the function examples on this site are actually running live in your browser! You can see the code that generates each example by checking out the source on GitHub.

:::

## Points

The most basic function-graphing utility is `mach2.graph.point`. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `x`: The x-coordinate of the point.
- `y`: The y-coordinate of the point.
- `color`: The color of the point (default: `white`).
- `label`: The label of the point (default: `'(x, y)'`).
- `alignX`: The horizontal alignment of the label (default: `center`).
- `alignY`: The vertical alignment of the label (default: `center`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.point(this.ctx, 0, 0, mach2.color.green, '(0, 0)', 'left', 'bottom');
```

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>


## Linear Functions

$$ y = mx + b $$

To graph a linear function, you can use the `mach2.graph.linearFunction` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `m`: The graidient of the line.
- `b`: The y-intercept of the line.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).


```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.linearFunction(this.ctx, 2, 3, mach2.color.red, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

## Quadratic Functions

$$ y = ax^2 + bx + c $$

To graph a quadratic function, you can use the `mach2.graph.quadraticFunction` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `a`: The coefficient of the quadratic term.
- `b`: The coefficient of the linear term.
- `c`: The constant term.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.quadraticFunction(this.ctx, 1, 0, -1, mach2.color.blue, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example3"></canvas>
</div>

## Cubic Functions

$$ y = ax^3 + bx^2 + cx + d $$

To graph a cubic function, you can use the `mach2.graph.cubicFunction` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `a`: The coefficient of the cubic term.
- `b`: The coefficient of the quadratic term.
- `c`: The coefficient of the linear term.
- `d`: The constant term.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.cubicFunction(this.ctx, 1, 0, 0, -1, mach2.color.purple, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example4"></canvas>
</div>

## Exponential Functions

$$ y = a \cdot b^x $$

To graph an exponential function, you can use the `mach2.graph.exponentialFunction` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `a`: The coefficient of the exponential term.
- `b`: The base of the exponential term.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.exponentialFunction(this.ctx, 1, 2, mach2.color.orange, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example5"></canvas>
</div>

## Logarithmic Functions

$$ y = a \cdot \log_b(x) $$

To graph a logarithmic function, you can use the `mach2.graph.logarithmicFunction` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `a`: The coefficient of the logarithmic term.
- `b`: The base of the logarithmic term.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.logarithmicFunction(this.ctx, 1, 2, mach2.color.yellow, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example6"></canvas>
</div>

## Custom Functions

$$ y = f(x) $$

You can also graph **any** function by using the `mach2.graph.fn` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `fn`: The function to graph. This function should take a single argument `x` and return a `number`.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.fn(this.ctx, (x) => Math.sin(x), mach2.color.pink, 4);
```
<div class="canvas">
    <canvas class="mach2" id="example7"></canvas>
</div>

### Polar Functions

$$ r = f(\theta) $$

You can also graph **polar** functions by using the `mach2.graph.polar` utility. This function takes the following arguments:

- `ctx`: The canvas context to draw on.
- `fn`: The function to graph. This function should take a single argument `theta` and return a `number`.
- `color`: The color of the line (default: `white`).
- `weight`: The width of the line (default: `1`).

```ts twoslash
import mach2 from 'mach2';
// @ts-ignore
// ---cut-before---
mach2.graph.polar(this.ctx, (theta) => Math.sqrt(10 * Math.cos(2 * theta)), mach2.color.green, 4);
```

<div class="canvas">
    <canvas class="mach2" id="example8"></canvas>
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

                            mach2.graph.point(this.ctx, 0, 0, mach2.color.green, '(0, 0)', 'left', 'bottom', foreground);
                        }
                    }
                );

                scene2.start();
            }

            const canvas2 = document.getElementById('example2');

            if (canvas2) {
                const scene = mach2.scene(canvas2, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.linearFunction(this.ctx, 2, 3, mach2.color.red, 4);

                            mach2.graph.point(this.ctx, 0, 3, mach2.color.red, undefined, undefined, 'bottom', foreground);
                            mach2.graph.point(this.ctx, -1.5, 0, mach2.color.red, undefined, 'left', undefined, foreground);
                        }
                    }
                );

                scene.start();
            }

            const canvas3 = document.getElementById('example3');

            if (canvas3) {
                const scene = mach2.scene(canvas3, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.quadraticFunction(this.ctx, 1, 0, -1, mach2.color.blue, 4);

                            mach2.graph.point(this.ctx, 0, -1, mach2.color.blue, undefined, undefined, 'bottom', foreground);
                            mach2.graph.point(this.ctx, 1, 0, mach2.color.blue, undefined, 'left', undefined, foreground);
                            mach2.graph.point(this.ctx, -1, 0, mach2.color.blue, undefined, 'left', undefined, foreground);
                        }
                    }
                );

                scene.start();
            }

            const canvas4 = document.getElementById('example4');

            if (canvas4) {
                const scene = mach2.scene(canvas4, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.cubicFunction(this.ctx, 1, 0, 0, -1, mach2.color.purple, 4);

                            mach2.graph.point(this.ctx, 0, -1, mach2.color.purple, undefined, undefined, 'bottom', foreground);
                            mach2.graph.point(this.ctx, 1, 0, mach2.color.purple, undefined, 'left', undefined, foreground);
                            mach2.graph.point(this.ctx, -1, -2, mach2.color.purple, undefined, 'left', undefined, foreground);
                        }
                    }
                );

                scene.start();
            }

            const canvas5 = document.getElementById('example5');

            if (canvas5) {
                const scene = mach2.scene(canvas5, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.exponentialFunction(this.ctx, 1, 2, mach2.color.orange, 4);

                            mach2.graph.point(this.ctx, 0, 1, mach2.color.orange, undefined, undefined, 'bottom', foreground);
                            mach2.graph.point(this.ctx, 1, 2, mach2.color.orange, undefined, 'left', undefined, foreground);
                            mach2.graph.point(this.ctx, -1, 0.5, mach2.color.orange, undefined, 'left', undefined, foreground);
                        }
                    }
                );

                scene.start();
            }

            const canvas6 = document.getElementById('example6');

            if (canvas6) {
                const scene = mach2.scene(canvas6, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.logarithmicFunction(this.ctx, 1, 2, mach2.color.yellow, 4);

                            mach2.graph.point(this.ctx, 1, 0, mach2.color.yellow, undefined, undefined, 'bottom', foreground);
                            mach2.graph.point(this.ctx, 2, 1, mach2.color.yellow, undefined, 'left', undefined, foreground);
                            mach2.graph.point(this.ctx, 0.5, -1, mach2.color.yellow, undefined, 'left', undefined, foreground);
                        }
                    }
                );

                scene.start();
            }

            const canvas7 = document.getElementById('example7');

            if (canvas7) {
                const scene = mach2.scene(canvas7, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.fn(this.ctx, (x) => Math.sin(x), mach2.color.pink, 4);
                        }
                    }
                );

                scene.start();
            }

            const canvas8 = document.getElementById('example8');

            if (canvas8) {
                const scene = mach2.scene(canvas8, {
                    background: bg
                });;

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.polar(this.ctx, (theta) => Math.sqrt(10 * Math.cos(2 * theta)), mach2.color.green, 4);
                        }
                    }
                );

                scene.start();
            }
        }, 0)
    })
</script>
