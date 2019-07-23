class Greeter2 {
    static standardGreeting = 'Hello,there'
    greeting: string
    constructor(message?: string) {
        this.greeting = message
    }
    greet(){
        if(this.greeting){
            return 'Hello,'+this.greeting
        }else{
            return Greeter2.standardGreeting
        }
    }
}

let greeterMaker : typeof Greeter2 = Greeter2 
greeterMaker.standardGreeting = 'Hey there'