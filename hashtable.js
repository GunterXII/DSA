class HashTable {
  constructor(size = 5) {
    // Array che rappresenta la tabella: ogni posizione è un "bucket".
    // Di default mettiamo 5 slot, ma in pratica scegli un numero più grande
    // e preferibilmente primo per distribuire meglio gli hash.
    this.keyMap = new Array(size);
  }

  hashFunction(key) {
    // Assicuriamoci di lavorare su una stringa (evita errori con numeri/oggetti)
    key = String(key).toLowerCase(); // normalizziamo per rendere 'A' uguale a 'a'

    let sum = 0;                    // accumulatore per il risultato
    const primeNumber = 31;         // numero primo usato per "mescolare" meglio i caratteri

    // Limitiamo il numero di iterazioni a 100 per evitare costi troppo grandi
    // su stringhe enormi (ottimizzazione pratica).
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      // Prendiamo il codice del carattere (es. 'a' -> 97).
      // Sottraiamo 96 per ottenere 'a'->1, 'b'->2, ... (più leggibile)
      // Nota: se il carattere non è una lettera, il valore può essere <= 0, ma
      // resta comunque un numero usabile nella formula.
      const charCode = key.charCodeAt(i) - 96;

      // Formula tipica: somma * primo + char
      // poi modulo della lunghezza dell'array per ottenere un indice valido.
      // Il modulo mantiene l'indice dentro [0, this.keyMap.length-1].
      sum = (sum * primeNumber + charCode) % this.keyMap.length;
    }

    // sum ora è un indice valido per this.keyMap
    return sum;
  }
  set(key,value){
    //prendiamo la chiave e facciamo chiamiamo la funzione hash che ci da un indice, cerchiamo l'indice che corrisponde. controlliamo se ci sta dentro gia un array e lo mettiamo dentro, se non cè creiamo un array vuoto e dopo mettiamo il dato chiave valore nell array [[]]
    
  // Calcoliamo l'indice usando la hashFunction
  let index = this.hashFunction(key);

  // Se a quell'indice non c’è ancora nulla,
  // inizializziamo un array vuoto che rappresenta il "bucket"
  if (!this.keyMap[index]) {
    this.keyMap[index] = [];        // creiamo il bucket
    this.keyMap[index].push([key, value]);  // mettiamo dentro la coppia [chiave, valore]
  } else {
    // Se invece il bucket esiste già, ci limitiamo ad aggiungere la nuova coppia
    this.keyMap[index].push([key, value]);
  }
}

  }
  get(key) {
  // 1. Usiamo la hash function per calcolare l'indice dentro la tabella
  let index = this.hashFunction(key);

  // 2. Controlliamo se nella keyMap esiste già un bucket (cioè un array di coppie)
  if (this.keyMap[index]) {

    // 3. Iteriamo tutte le coppie [chiave, valore] presenti in quel bucket
    //    Qui uso la destructuring: ogni "coppia" è un array [chiave, valore].
    //    Scrivere "let [k, v]" è come fare:
    //       let k = coppia[0];
    //       let v = coppia[1];
    for (let [k, v] of this.keyMap[index]) {

      // 4. Se la chiave trovata corrisponde a quella che cerchiamo,
      //    allora ritorniamo subito il valore associato
      if (k === key) return v;
    }
  }

  // 5. Se non troviamo la chiave oppure il bucket non esiste, ritorniamo undefined
  return undefined; 
}
getAllKeys() {
  // Array dove salveremo tutte le coppie [chiave, valore]
  const keys = [];

  // Cicliamo ogni "bucket" dentro la tabella (ogni cella della keyMap)
  for (let bucket of this.keyMap) {

    // Se il bucket è vuoto (undefined), passiamo al prossimo giro
    if (!bucket) continue;

    // Se invece c’è un array di coppie dentro al bucket,
    // cicliamo tutte le coppie presenti
    for (let [key, value] of bucket) {
      // "let [key, value]" spacchetta la coppia: 
      //   key = coppia[0], value = coppia[1]
      keys.push([key, value]); 
    }
  }

  // Ritorniamo l’array finale con tutte le coppie
  return keys;
}

