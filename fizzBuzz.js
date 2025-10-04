function fizzBuzz(n){
    for (let index = 0; index <= n; index++) {
        console.log(index)
        if(index==0){
            continue
        }
        if(index%3==0){
            console.log(index + " Fizz")
        }
        if(index%5==0){
            console.log(index + " Buzz")
        }
        if(index%3==0 && index%5==0){
            console.log(index + " FizzBuzz")
        }
    }
}
fizzBuzz(21)