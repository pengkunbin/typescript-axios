let passworld = 'secret passcode'
class Employee2 {
    _fullName: string
    get fullName():string{
        return this.fullName
    }
    set fullName(newName:string){
        if(passworld&&passworld ==='secret passcode'){
            this._fullName = newName
        }else{
            console.log('Error:Unauthorized update of employee!')
        }
    }
}

let employee = new Employee2()
employee.fullName = 'Bob Smith'

if (employee.fullName) {
    console.log(employee.fullName)
}