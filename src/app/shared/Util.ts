/**
 * Returns a random number between a given range, which is not equal to one of an existing key given as an array.
 * @param min Is the lowest possible random number, inclusively.
 * @param max Is the highest possible random number, inclusively.
 * @param keys is an array containing existing keys. The resulting key does differ from those keys.
 * @returns A unique (with respect to the given array) key.
 */
export function genRandomKey(min: number, max: number, keys: number[]): number {
    let key: number;

    do
        key = rand(min, max);
    while (keys.find(k => k == key) != undefined);

    return key;
}

export function rand(min: number, max: number): number {
    return Math.round(min + Math.random() * max);
}

export function getLast<T>(arr: T[]): T {
    return arr[arr.length - 1];
}