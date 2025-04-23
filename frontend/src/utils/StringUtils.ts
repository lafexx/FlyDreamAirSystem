export function isEmptyOrWhitespace(str: string) {
    return !str || str.trim().length === 0;
}