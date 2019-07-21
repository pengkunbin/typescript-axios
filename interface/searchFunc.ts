interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (source: string, subString: string): boolean {
    let result = source.search(subString)
    return result > -1
}

//函數接口