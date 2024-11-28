---
layout: home

hero:
    name: 'Mach2'
    text: 'Make your canvas visualisations <em>fly</em>.'
    tagline: A speedy, lightweight, and typesafe canvas rendering and lifecycle management library.
    actions:
        - theme: brand
          text: Get Started
          link: /intro/get-started
        - theme: alt
          text: API Documentation
          link: /intro/basics

features:
    - title: Mathematical Rendering
      details: Provides a multitude of mathematical functions for rendering, and allows you to graph them with ease.
      icon: 📐
    - title: Lifecycle Management
      details: Manages your canvas' rendering lifecycle for you, so you can focus on what you want to draw.
      icon: 🔄
    - title: Lightweight
      details: Weighing in at just ~20KB, mach2 is a lightweight library that won't slow down your websites or visualisations.
      icon: 🏋
    - title: Easy Animation
      details: Provides simple primitives for animations, so you can animate your renderings.
      icon: 🎨
---

---

<div class="canvas">
    <canvas class="mach2" id="demo"></canvas>
</div>

<script setup>
    import mach2 from 'mach2';
    import { onMounted } from 'vue';

    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;

    function lorenz([x, y, z]) {
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;
        return [dx, dy, dz];
    }

    function rk4(f, state, dt) {
        const k1 = f(state);
        const k2 = f(state.map((v, i) => v + (dt / 2) * k1[i]))
        const k3 = f(state.map((v, i) => v + (dt / 2) * k2[i]))
        const k4 = f(state.map((v, i) => v + dt * k3[i]))

        return state.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }

    const states = [
        [1, 1, 0],
        [2, 1, 0],
        [1, 2, 0],
        [1, 1, 2],
    ];

    const colors = [mach2.color.lightBlue, mach2.color.lightGreen, mach2.color.lightRed, mach2.color.lightYellow];

    const points = [];

      onMounted( () => {
        const darkmode = document.querySelector('html').classList.contains('dark');

        const bg = darkmode ? mach2.color.black : mach2.color.white;
        const foreground = darkmode ? mach2.color.white : mach2.color.black;

        // vue will await this script, so we need to async load the canvas
        setTimeout(async () => {
            const canvas = document.getElementById('demo');

            if (canvas) {
                const scene = mach2.scene(canvas, {
                    background: bg
                });

                mach2.math.setImmediateScale(20)

                scene.add(
                    new class extends mach2.Dynamic {
                        update() {
                            if (!this.ctx) return;

                            const rect = canvas.getBoundingClientRect()
                                      
                            mach2.graph.axis(this.ctx, 0.4, mach2.color.opacity(foreground, 0.4));

                            for (let i = 0; i < states.length; i++) {
                                const state = states[i];

                                points[i] ??= [];

                                states[i] = rk4(lorenz, state, this.deltaTime / 1000);

                                points[i].push(states[i]);

                                mach2.draw.point(this.ctx, states[i][0], states[i][1], colors[i], 2);

                                mach2.graph.segment(
                                    this.ctx,
                                    points[i]?.map(([x, y]) => [x, y]),
                                    mach2.color.objectOpacity(colors[i], 0.8),
                                    1
                                );
                            }
                        }
                    }
                );  

                scene.start();
            }
        })
    })
</script>
