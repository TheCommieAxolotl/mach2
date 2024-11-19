import { Color } from "./shared";

export const red = "#C74440";
export const lightRed = "#f2635e";
export const blue = "#2C70B3";
export const lightBlue = "#5c9ad1";
export const green = "#378C47";
export const lightGreen = "#5fa95a";
export const yellow = "#E8C547";
export const lightYellow = "#f2d966";
export const orange = "#E88B2C";
export const lightOrange = "#f2a94d";
export const purple = "#A05EB5";
export const lightPurple = "#b78dc9";
export const pink = "#D97BAC";
export const lightPink = "#e2a2c1";

/**
 * Take any color and return a new color with the specified opacity.
 */
export const opacity = (color: Color, opacity: number): Extract<Color, string> => {
    const str = parseColor(color);

    const format = str.startsWith("#") ? "hex" : str.startsWith("rgba") ? "rgba" : str.startsWith("rgb") ? "rgb" : str.startsWith("hsl") ? "hsl" : "unsupported";

    if (format === "unsupported") {
        return str;
    }

    if (format === "hex") {
        return (
            str +
            Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0")
        );
    }

    if (format === "rgb") {
        return `rgba(${str.slice(4, str.length - 1)}, ${opacity})`;
    }

    if (format === "rgba") {
        return str.slice(0, str.length - 2) + opacity + ")";
    }

    if (format === "hsl") {
        return `hsla(${str.slice(4, str.length - 1)}, ${opacity})`;
    }

    return str;
};

/**
 * Parse a color to a string.
 */
export const parseColor = (color?: Color): string => {
    if (!color) {
        return "";
    }

    if (typeof color === "string") {
        return color;
    }

    const { r, g, b, a } = color;

    return `rgba(${r},${g},${b},${a || 1})`;
};
