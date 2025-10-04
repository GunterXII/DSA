function twoSum(numeri,target){
    let map={}

    for(let n of numeri){
        let complemento = target - n
        if(map[complemento]){
            return [map[complemento], numeri.indexOf(n)]
        }else{
            map[n] = numeri.indexOf(n)
        }
    }
}
numeri = [2, 7, 11, 15]
target = 9
/*
Inizio

map = {} (vuoto)

Iterazione 1

n = 2

differenza = 9 - 2 = 7

map = {} → 7 non c’è

salvo 2 con il suo indice 0 → map = {2: 0}

Iterazione 2

n = 7

differenza = 9 - 7 = 2

controllo map: c’è la chiave 2 ✅

quindi ritorno [map[2], indice_di_7] → [0, 1]

Risultato trovato → stop.
 */