interface ReadonlyStringArray{
    readonly [index:number]:String
}

let myArray2:ReadonlyStringArray = ['Alice','Bob']

//myArray2[2] = 'Mollory'
//上面语句会报错，readonly