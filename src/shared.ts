export type VerticalPosition = number | "top" | "center" | "bottom";
export type HorizontalPosition = number | "left" | "center" | "right";
export type Position = [HorizontalPosition, VerticalPosition];
export type Color = string | { r: number; g: number; b: number; a?: number };
