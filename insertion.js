let a = [7, 3, 5,10, 2, 9]

for (let i = 1; i < a.length; i++) {
    let successivo = a[i]
    var j
    for (j = i; j > 0; j--) {
        if (a[j - 1] > successivo) {
            a[j] = a[j - 1]
        } else {
            break
        }
    }
    a[j] = successivo
}

console.log(a) // [2, 3, 5, 7, 9]
let massimo=a[0]
for(let i=1;i<a.length;i++){
    if(a[i]>massimo){
        massimo=a[i]
    }
}
console.log(massimo)

let ar=[1,2,3,4,5,6,7]
let target=2
for(let i=ar.length/2;i<ar.length;i++){
    if(ar[i]>target){
        let new=ar.slice(0,ar.length/2)
    }
}