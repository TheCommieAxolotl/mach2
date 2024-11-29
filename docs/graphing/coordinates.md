---
outline: deep
---

# Dealing with Coordinates

Mach2 has a few different coordinate systems used internally, and sometimes you need to convert between them.

## Coordinate Systems

### DOM Coordinates

The most basic coordinate system is the DOM coordinate system. This is the same as the browser's coordinate system, with the origin at the top left of the window, and the y-axis increasing downwards. DOM coordinates do not account for the position of the canvas on the page, so no matter what, (0,0) will always be the top left of the window.

### Canvas Coordinates

The canvas coordinate system is the same as the DOM coordinate system, but with the origin at the top left of the _canvas_. Canvas coordinates are also impacted by a scene's resolution, so they may not correspond to the width and height of the canvas element if the scene's resolution is not exactly `1`.

Canvas coordinates are also impacted by a scene's zoom level, and translation. The zoom level scales the coordinates, and the translation moves the origin.

### Cartesian Coordinates

Cartesian coordinates correspond to units on drawn axes, with the origin at the center of the canvas. The x-axis increases to the right, and the y-axis increases upwards. Cartesian coordinates are used for drawing shapes and text, and are converted to canvas coordinates internally before being drawn.

Most (not all!) functions accept Cartesian coordinates, and convert them to canvas coordinates internally. However, be aware that many of the `mach2.draw.*` functions do not convert coordinates, and require you to do the conversions yourself (see below).

### Polar Coordinates

Polar coordinates are used for drawing shapes that are defined by a radius and an angle. The origin is at the center of the canvas, and the angle is measured in radians, with 0 pointing to the right, and increasing counter-clockwise.

Polar coordinates are currently only accepted by the `mach2.grah.polar` function.

## Converting Coordinates

[View Source](https://github.com/TheCommieAxolotl/mach2/blob/main/src/math/conversion.ts)

To convert between coordinate systems, you can use the following functions:

- `mach2.math.cartesianToCanvas(ctx, x, y, sceneId)`: Converts Cartesian coordinates to canvas coordinates.
- `mach2.math.canvasToCartesian(ctx, x, y, sceneId)`: Converts canvas coordinates to Cartesian coordinates.
- `mach2.math.domToCartesian(ctx, x, y, sceneId)`: Converts canvas coordinates to Cartesian coordinates.
- `mach2.math.polarToCartesian(r, theta)`: Converts polar coordinates to Cartesian coordinates.
- `mach2.math.cartesianToPolar(x, y)`: Converts Cartesian coordinates to polar coordinates.

:::tip

Notice how some methods require a `sceneId` parameter? This is because the conversion functions need to know the resolution and zoom level of the scene to convert between coordinate systems.

Instead of passing in a `sceneId`, you can instead use each scene's `.c2p`, `.p2c`, and `d2c` methods to convert between coordinate systems. These methods are bound to the scene, and do not require a `sceneId` parameter.