function reverseNumber(n){
    return Number(String(n).split("").reverse().join(""))
}
console.log(typeof(reverseNumber(1234)))