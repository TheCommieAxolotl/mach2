export * from "./lerp";
export * from "./conversion";
export * from "./points";
export * from "./map";
export * from "./angles";

export const holdsValue = (value: number | undefined | null) => {
    if (value === undefined || value === null || !isFinite(value) || isNaN(value)) {
        return false;
    }

    return true;
};
