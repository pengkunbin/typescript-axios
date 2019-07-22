class Greeter {
    greeting: String

    constructor(message: String) {
        this.greeting = message
    }
    greet() {
        return 'Hello, ' + this.greeting
    }
}
let greeter = new Greeter('jizou')
greeter.greet()