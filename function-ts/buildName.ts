/*
    ts中函数定义里传入参数得跟函数定义的数量一样
*/


function buildName(firstName: string, lastName: string): string {
    return firstName + '' + lastName
}

let result1 = buildName('jizou', 'kun')
let result2 = buildName('jizou', '')
let result3 = buildName('', '')

/*
    可选参数要放在后面不能放在前面
*/

function buildName2(firstName: string, lastName?: string): string {
    return firstName + '' + lastName
}

/*
    默认参数
*/

function buildName3(firstName = 'jizou', lastName?: string): string {
    return firstName + '' + lastName
}

let result4 = buildName3(undefined, 'kun')


/*
    如果不知道传入参数的个数，可以使用...
    是一个比较好用的语法糖
*/
function buildName4(firstName: string, ...restOfName: string[]): string {
    return firstName + '' + restOfName
}

let buildNameFn: (fname: string, ...rest: string[]) => string = buildName4