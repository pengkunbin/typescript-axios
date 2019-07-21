let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

a = ro as number[]

