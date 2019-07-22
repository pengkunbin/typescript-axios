class Animal {
    name: string
}

class Dog extends Animal {
    breed: string
}

interface NotOnly {
    [x: number]: Dog
    [x: string]: Animal
}