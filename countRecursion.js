function countDown(number){
    if(!number){
        console.log("finitoooo");
        
        return;
    }
    console.log(number);
    
    countDown(number-1)
}
countDown(5)

function factorial(n){
    if(n===1){
        return 1
    }
    return n * factorial(n-1)
}
console.log(factorial(5));

