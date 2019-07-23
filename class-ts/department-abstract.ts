abstract class Department {
    name: string

    constructor(name: string) {
        this.name = name
    }
    printNmae(): void {
        console.log('Department name ' + this.name)
    }
    abstract printMeeting(): void
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting ad Auditing')
    }
    printMeeting(): void {
        console.log('printMeeting')
    }
    genterateReports():void{
        console.log('Generating accounting')
    }
}

let department:Department
department = new AccountingDepartment()
department.printMeeting()
department.printNmae()

/*
    department.genterateReports()
    上面这条语句会报错
    原因是抽象类中没有这个方法
*/