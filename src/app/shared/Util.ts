export function genRandomKey(min: number, max: number, map: Map<any, any>): number {
    let key: number;

    do
        key = rand(min, max);
    while (map.has(key));

    return key;
}

export function rand(min: number, max: number): number {
    return Math.round(min + Math.random() * max);
}