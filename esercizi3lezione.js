let somma=0
let n=10
for(let i=0;i<=n;i++){
    somma+=i
}
console.log(somma)

let numero

let somma2=0

/*while(somma2<101){
    numero=Number(prompt("inserisci un numero: "))
    somma2+=numero
    console.log(somma2)
}*/
console.log(somma2)
let n2=17
for(let i=2;i<=n2-1;i++){
    if(n2%i==0){
        console.log("il numero non è primo")
        break
    }
}

/*let cont=0
let n3
while(cont<=10){
    n3=Number(prompt("inserisci un numero: "))
    for(let i=2;i<=n3-1;i++){
    if(n3%i==0){
        console.log("il numero non è primo")
        break
    }
    cont++
}
}*/
let stringa=""
for(let i=10;i>=0;i-=2){
    let cont=1
    while(cont<=i){
        stringa+="*"
        cont++
    }
    stringa+=" \n"
}
console.log(stringa)


let numeri=[]
let count=0

while(count<=10){
    numeri.push(Number(prompt("inserisci un numero: ")))
    count++
}
let sommaM = 0;
let conteggio = 0;

if (numeri[numeri.length - 1] > 0) {
  // Sommo solo i positivi
  for (let numero of numeri) {
    if (numero > 0) {
      sommaM += numero;
      conteggio++;
    }
  }
} else {
  // Sommo solo i negativi
  for (let numero of numeri) {
    if (numero < 0) {
      sommaM += numero;
      conteggio++;
    }
  }
}

let media = sommaM / conteggio; 
console.log(media);


let inseriti = [];
let nr;

do {
  nr = Number(prompt("inserisci un numero: "));

  if (nr !== 0) {
    inseriti.push(nr);

    let i = inseriti.length - 1; // indice dell'ultimo numero inserito

    if ((nr > 0 && nr % 2 === 0) || (nr < 0 && inseriti[i - 1] >= nr)) {
      console.log(nr);
    }
  }
} while (nr !== 0);

}