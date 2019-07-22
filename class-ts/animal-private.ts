class Animal3 {
    public name: string
    public constructor(name: string) {
        this.name = name
    }
    public move(distance: Number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}

class Animal4 {
    private name: string
    public constructor(name: string) {
        this.name = name
    }
    public move(distance: Number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}
/*
   new Animal4('Cat').name
  上面代码是会报错的，因为name被定义成私有变量会报错
*/
class Rhino extends Animal4 {
    constructor() {
        super('Rhino')
    }
}

class Employee {
    private name: string
    constructor(name: string) {
        this.name = name
    }
}

//私有变量不能在派生类中使用，只能在当前类使用