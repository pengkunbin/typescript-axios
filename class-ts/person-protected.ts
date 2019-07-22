class Person {
    protected name: string

    protected constructor(name: string) {
        this.name = name
    }
}
class Empolyee extends Person {
    private deparment: string

    constructor(name: string, deparment: string) {
        super(name)
        this.deparment = deparment
    }
    getElevatorPitch() {
        return `Hello,my name is${this.name},and I work in ${this.deparment}`
    }
}

let howard = new Empolyee('Howard','Sales')
console.log(howard.getElevatorPitch())

/*
    console.log(howard.name)
    打印`howard.name`就会报错，
    原因是被protected修饰的类只能在子类中调用，而不能在实例中调用

    同理的，在构造函数前面加protected，可以只让子类调用构造函数。

    let tom = new Person('Tom')
    这一段会报错
*/