function capitalize(frase){
    return frase.toLowerCase().split(" ").map(parola=>parola[0].toUpperCase()+parola.slice(1)).join(" ")
}

console.log(capitalize("ciao bernardo"));

