---
outline: deep
---

# API Basics

Learn some basic capabilites of Mach2, and get introduced to the core concepts of the library.

## Scenes

[View Source](https://github.com/TheCommieAxolotl/mach2/blob/main/src/lifecycle/scene.ts)

Every Mach2 visualisation is contained within a `Scene`. A `Scene` is a container for all the objects in your visualisation, and it determines how Mach2 will execute lifecyle events.

To create a scene, simply call `mach2.scene(canvas: HTMLCanvasElement)`. This will create a new scene that will render to the given canvas element.

```ts twoslash
import mach2 from 'mach2';

// Get the canvas element from the DOM
const canvas = document.getElementById('canvas');

// Create a new scene
const scene = mach2.scene(canvas as HTMLCanvasElement); // [!code highlight]
```

## Objects

[View Source](https://github.com/TheCommieAxolotl/mach2/blob/main/src/object)

Objects are the building blocks of your visualisation. They can be static or dynamic, and can be added to a scene to be rendered.

### Dynamic Objects

To create a dynamic object, all you need to do is extend the `mach2.Dynamic` class and implement the `update` method. This method will be called every frame, and you can use it to update the object's state.

```ts twoslash {2-10}
import mach2 from 'mach2';
const canvas = document.getElementById('canvas');
const scene = mach2.scene(canvas as HTMLCanvasElement);
// ---cut-before---
scene.add(
    new class extends mach2.Dynamic {
        update() {
            if (!this.ctx) return;

            mach2.graph.axis(this.ctx);

            mach2.graph.linearFunction(this.ctx, this.frame / 100, 0, 'white', 4);
        }
    }
);
```

<div class="canvas">
    <canvas class="mach2" id="example1"></canvas>
</div>

### Static Objects

You can also create static objects by extending the `mach2.Static` class. These objects will only be rendered once, and will not be updated every frame.

```ts twoslash {2-10}
import mach2 from 'mach2';
const canvas = document.getElementById('canvas');
const scene = mach2.scene(canvas as HTMLCanvasElement);
// ---cut-before---
scene.add(
    new class extends mach2.Static {
        mount() {
            if (!this.ctx) return;

            mach2.graph.axis(this.ctx);

            mach2.graph.linearFunction(this.ctx, 1, 0, 'white', 4);
        }
    }
);
```

<div class="canvas">
    <canvas class="mach2" id="example2"></canvas>
</div>

## Next Steps

<!-- Now that you've learned the basics of Mach2, you can move on to more advanced topics like [functions](/graphing/functions), [animations](/intro/animations), and [interactivity](/intro/interactivity). -->
Now that you've learned the basics of Mach2, you can move on to more advanced topics like [functions](/graphing/functions).


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
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx);

                            mach2.graph.linearFunction(this.ctx, this.frame / 100, 0, 'white', 4);
                        }
                    }
                );

                scene.start();
            }

            const canvas2 = document.getElementById('example2');

            if (canvas2) {
                const scene2 = mach2.scene(canvas2);

                scene2.add(
                    new class extends mach2.Static {
                        mount() {
                            if (!this.ctx) return;

                            mach2.graph.axis(this.ctx);

                            mach2.graph.linearFunction(this.ctx, 1, 0, 'white', 4);
                        }
                    }
                );

                scene2.start();
            }
        }, 0)
    })
</script>
