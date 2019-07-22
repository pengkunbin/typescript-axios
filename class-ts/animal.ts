class Animal {
    move(distance: number) {
        console.log(`Animal moved ${distance}m`)
    }
}

class Dog extends Animal {
    bark() {
        console.log(`Woof! Woof!`)
    }
}

const dog = new Dog()
dog.bark()
dog.move(10)