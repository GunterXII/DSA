function countWord(str) {
  // Dividiamo la stringa in un array di parole separate da spazi
  let array = str.split(" ");

  // Oggetto che useremo come "mappa" parola → conteggio
  let map = {};

  // Cicliamo tutte le parole
  for (let parola of array) {

    // Se la parola non è ancora presente nella mappa
    if (!map[parola]) {
      // La inizializziamo con valore 1 (prima occorrenza)
      map[parola] = 1;
    } else {
      // Se invece c’è già, aumentiamo il conteggio
      map[parola]++;
    }
  }

  // Ritorniamo la mappa completa parola → numero di volte
  return map;
}

console.log(countWord("Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura, che la diritta via era smarrita ciao ciao"));
