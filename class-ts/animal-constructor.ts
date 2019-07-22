class Animal2 {
    name: string

    constructor(name: string) {
        this.name = name
    }

    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}

class Snake extends Animal2 {

    constructor(name: string) {
        //继承一定要做的
        super(name)
    }
    move(distance: number = 5) {
        console.log('Slithering...')
        super.move(distance)
    }
}

class Horse extends Animal2 {

    constructor(name: string) {
        super(name)
    }
    move(distance: number = 45) {
        console.log('Golloping...')
        super.move(distance)
    }
}

let sam = new Snake('Sammy')
let tom: Animal2 = new Horse('Tommy')

sam.move()
tom.move(34)