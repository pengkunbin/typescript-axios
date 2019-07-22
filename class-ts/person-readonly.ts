class Person2{
    readonly name:string

    constructor(name:string){
        this.name = name
    }
}

let john = new Person2('John')
/*
    john.name = ''
    上述语句报错，readonly
*/