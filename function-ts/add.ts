function add(x: number, y: number): number {
    return x + y
}

let myadd: (baseValue: number, increment: number) => number = function (x: number, y: number): number {
    return x + y
}