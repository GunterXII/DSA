function arrayChunk(arr,chunkSize){
    const res = []; // risultato: array di chunk

  // i salta in passi di chunkSize: 0, chunkSize, 2*chunkSize, ...
  // ad ogni passo prendo una porzione con slice(i, i+chunkSize)
  // slice non modifica l'array originale, ritorna una nuova porzione.
  for (let i = 0; i < arr.length; i += chunkSize) {
    //tipo, facciamo che chunksize sia 3, inizialmente faccio lo slice da 0 fino a 4, poi i diventa i+chunksize quindi diventa 3, e poi faccio lo slice da 3 fino i + chunksize ovvero 6, e poi i diventa i + chunksize ovvero 6 e poi faccio lo slice da 6 fino a 9 e cosi via, questo è il significato di i + chunksize 
    res.push(arr.slice(i, i + chunkSize));
  }

    return res
}
console.log(arrayChunk([1,2,3,4,5],2))
