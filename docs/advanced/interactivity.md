---
outline: deep
---

# Interactivity

By default, Mach2 scenes can accept user input to control the view. This includes panning and zooming.

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

However, if this behaviour is undesired, it can be disabled by changing the `interactive` property of the scene.

To fully disable interactivity, set `interactive` to `false`.

```ts twoslash
import mach2 from 'mach2';

const canvas = document.getElementById('canvas');

const scene = mach2.scene(canvas as HTMLCanvasElement, {
    interactive: false
});
```

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

## Selective Interactivity

If you only want to disable panning, or zooming, you can set the `pannable` and `zoomable` properties of the scene to `false`.

```ts twoslash
import mach2 from 'mach2';

const canvas = document.getElementById('canvas');

// ---cut-before---
const scene = mach2.scene(canvas as HTMLCanvasElement, {
    interactive: {
        scroll: true,
        move: false
    }
});
```

<div class="canvas">
    <canvas class="mach2" id="example3"></canvas>
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
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.linearFunction(this.ctx, 1, 0, mach2.color.red, 4);
                        }
                    }
                );

                scene.start();
            }

            const canvas2 = document.getElementById('example2');

            if (canvas2) {
                const scene2 = mach2.scene(canvas2, {
                    interactive: false,
                    background: bg
                });

                scene2.add(
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.linearFunction(this.ctx, -1, 0, mach2.color.green, 4);
                        }
                    }
                );

                scene2.start();
            }

            const canvas3 = document.getElementById('example3');

            if (canvas3) {
                const scene3 = mach2.scene(canvas3, {
                    interactive: {
                        scroll: true,
                        move: false
                    },
                    background: bg
                });

                scene3.add(
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx, undefined, mach2.color.opacity(foreground, 0.4));

                            mach2.graph.quadraticFunction(this.ctx, 1, 0, 0, mach2.color.blue, 4);
                        }
                    }
                );

                scene3.start();
            }
        })
    })
</script>