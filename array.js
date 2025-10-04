/**
 * myarray-notes.js
 *
 * Un file unico che contiene:
 *  - una versione corretta e commentata della classe MyArray (simula un array "dinamico")
 *  - spiegazioni passo-passo (in italiano) sul funzionamento di ogni metodo
 *  - complessità (Big-O) per tempo e spazio per ogni operazione
 *  - best practice, errori comuni e piccoli esercizi per l'esame
 *
 * Scopo: avere tutto in un singolo file .js che puoi leggere, eseguire e studiare.
 *
 * Esempio d'uso in fondo al file.
 */

/* -------------------------
   Classe: MyArray (simulazione)
   - Usa un oggetto `data` per memorizzare gli elementi con chiavi numeriche.
   - Tiene traccia della proprietà `length` come gli array JS nativi.
   - Fornisce: push, get, pop, shift, deleteByIndex.
   ------------------------- */
class MyArray {
  constructor() {
    // lunghezza logica dell'array
    this.length = 0;
    // storage interno: chiavi numeriche -> valori
    this.data = {};
  }

  /**
   * push(element)
   * - Inserisce l'elemento alla fine.
   * - Time: O(1)    (opera direttamente all'indice length)
   * - Space: O(1)   (aggiunge un solo elemento nello storage)
   */
  push(element) {
    this.data[this.length] = element;
    this.length++;
    // ritorniamo la nuova lunghezza come fa Array.prototype.push
    return this.length;
  }

  /**
   * get(index)
   * - Restituisce l'elemento all'indice richiesto, oppure undefined se fuori range.
   * - Time: O(1)
   * - Note: controllo dei limiti (index < 0 o >= length)
   */
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    return this.data[index];
  }

  /**
   * pop()
   * - Rimuove e ritorna l'ultimo elemento.
   * - Time: O(1)
   * - Space: O(1)
   */
  pop() {
    if (this.length === 0) return undefined;
    const lastIndex = this.length - 1;
    const lastItem = this.data[lastIndex];
    delete this.data[lastIndex];
    this.length--;
    return lastItem;
  }

  /**
   * shift()
   * - Rimuove e ritorna il primo elemento (index 0).
   * - È necessario "shiftare" (spostare) tutti gli elementi verso sinistra di 1.
   * - Time: O(n) perché spostiamo ogni elemento.
   * - Space: O(1) extra (uso di variabili temporanee), ma lo storage interno resta O(n).
   */
  shift() {
    if (this.length === 0) return undefined;

    const first = this.data[0];

    // Sposta tutti gli elementi indietro di 1
    for (let i = 0; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    // Cancella l'ultimo "duplicato" rimasto e aggiorna length
    delete this.data[this.length - 1];
    this.length--;
    return first;
  }

  /**
   * deleteByIndex(index)
   * - Rimuove l'elemento all'indice `index` e restituisce l'item rimosso.
   * - Deve spostare tutti gli elementi successivi indietro di 1.
   * - Time: O(n) (in media / worst-case dipende da quanti elementi devono essere spostati)
   * - Space: O(1) extra
   */
  deleteByIndex(index) {
    if (index < 0 || index >= this.length) return undefined;

    const item = this.data[index];

    // Sposta gli elementi successivi indietro
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    // Rimuovi l'ultimo elemento ormai duplicato e aggiorna length
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }

  /**
   * toArray() - utility per debug / stampa facile
   * - Converte lo storage in un array JS reale (utile per console.log leggibile).
   * - Time: O(n)
   */
  toArray() {
    const out = [];
    for (let i = 0; i < this.length; i++) out.push(this.data[i]);
    return out;
  }
}

/* ============================
   NOTE DIDATTICHE E APPUNTI
   ============================ */

/*
1) Correzioni che ho applicato rispetto al codice originale che mi hai dato:
   - Nei loop originali usavi `array.length` (variabile non definita). 
     Ho sostituito con `this.length`.
   - get() ora controlla `index >= this.length` (prima controllava solo >) e
     restituisce `undefined` per coerenza con il comportamento JS nativo.
   - shift() e deleteByIndex() ora spostano correttamente partendo dall'indice giusto.
   - pop() gestisce il caso array vuoto restituendo undefined.
   - Ho aggiunto toArray() per stampa leggibile.

2) Complessità (Big-O) riassunto per i metodi:
   - push: O(1) time, O(1) space
   - get:  O(1) time, O(1) space
   - pop:  O(1) time, O(1) space
   - shift: O(n) time, O(1) extra space
   - deleteByIndex: O(n) time, O(1) extra space
   - toArray: O(n) time, O(n) space (per array di output)

   Spiegazione rapida: shift/deleteByIndex devono "spostare" elementi, perciò sono lineari.
   push/pop lavorano alla fine dell'array (last index) e sono costanti.

3) Perché usiamo `delete this.data[index]`?
   - Per rimuovere la proprietà dall'oggetto `data`. In un'implementazione reale di un array
     nativo questo equivale a "liberare" quella cella. Qui è solo per pulizia e per evitare
     che `toArray()` raccolga valori fantasma.

4) Trade-off tempo vs spazio:
   - Se vuoi migliorare shift/deleteByIndex, in genere usi strutture dati diverse:
     linked list (shift O(1)), oppure mantieni due indici "start" e "end" (coda circolare)
     per evitare di spostare elementi — ma poi la logica di accesso per indice diventa O(n).
   - hash / set possono velocizzare ricerche ma introducono spazio extra O(n).

*/

/* ============================
   ESEMPI E TEST (puoi eseguire questo file con node)
   ============================ */

console.log("=== Demo MyArray ===");
const array = new MyArray();

console.log("push 1,2,3,4");
array.push(1);
array.push(2);
array.push(3);
array.push(4);
console.log("raw storage:", array.data);
console.log("toArray():", array.toArray(), "length:", array.length);

console.log("\nget(2):", array.get(2)); // 3
console.log("pop():", array.pop()); // 4
console.log("after pop toArray():", array.toArray(), "length:", array.length);

console.log("\nshift():", array.shift()); // 1
console.log("after shift toArray():", array.toArray(), "length:", array.length);

console.log("\ndeleteByIndex(1):", array.deleteByIndex(1)); // rimuove l'elemento all'indice 1
console.log("after delete toArray():", array.toArray(), "length:", array.length);

console.log("\npop until empty:");
console.log(array.pop());
console.log(array.pop()); // undefined se vuoto
console.log("final:", array.toArray(), "length:", array.length);

/* ============================
   BEST PRACTICE e TRUCCHI (da ricordare per l'esame)
   ============================ */

/*
- Se devi implementare una struttura che richiede frequenti shift() all'inizio,
  valuta l'uso di una LinkedList o una deque (doppia coda) per avere O(1) shift/unshift.
  Gli array (o strutture back-end come questa) sono ottimi per push/pop finali.

- Quando implementi deleteByIndex, ricordati di spostare solo gli elementi successivi
  (parti da index, non da 0): risparmi lavoro se cancelli vicino alla fine.

- Se vuoi performance migliori per molte cancellazioni e insersioni vicino all'inizio,
  sfrutta una strategia "lazy": mantieni un offset start e non spostare, ma gestisci
  map/indice per accessi. Questo è ciò che fa internamente una "deque circolare".

- Usa sempre controlli dei limiti (index < 0 || index >= length) per evitare bug.

- Per debug, aggiungi metodi helper come toArray() o inspect() per visualizzare lo stato.

- Preferisci restituire `undefined` per out-of-bounds (coerente con Array.prototype) piuttosto che -1,
  a meno che tu non stia imitanto la semantica di `indexOf` (che usa -1 per dire "non trovato").

*/

/* ============================
   ERRORI COMUNI (che ti faranno perdere punti in un esame)
   ============================

- Usare una variabile esterna non definita (es. `array.length` invece di `this.length`).
- Non tenere aggiornato `length` quando si eliminano elementi.
- Non gestire casi limite (pop/shift su array vuoto).
- Spostare elementi dall'inizio invece che dalla posizione di cancellazione (inefficiente).
*/

/* ============================
   ESERCIZI RAPIDI (fai e correggi)
   ============================
1) Implementa un metodo `unshift(element)` che aggiunge in testa e restituisce la nuova length.
   - Complessità prevista: O(n) (devi spostare tutti gli elementi a destra).

2) Implementa `insertAt(index, element)` che inserisce l'elemento in una posizione arbitraria.
   - Complessità: O(n) worst-case (spostamento).

3) Implementa `find(predicate)` che ritorna il primo elemento che soddisfa predicate.
   - Complessità: O(n)

4) Prova a implementare una versione "deque" (double-ended queue) con due indici front/back
   e storage oggetto per evitare spostamenti ad ogni shift. Documenta pro/contro.

Eseguendo e correggendo questi esercizi consoliderai la comprensione dei costi temporali.
*/

/* ============================
   SCALLETTA RIASSUNTIVA (da ripassare prima dell'esame)
   ============================
1. Capire cosa memorizza `length` e cosa `data` (1 min).
2. push/pop => costanti O(1). (2 min)
3. shift/deleteByIndex => lineari O(n): capire perché (3-5 min).
4. Eseguire esempi: push 4 elementi, shift, delete in mezzo. (5-10 min)
5. Alternative strutture dati: linked list, deque, hash map. (5 min)
*/

/* Fine del file: se vuoi che aggiunga `unshift` o la versione deque,
   lo scrivo qui sotto e lo includo nel file — dimmi quale preferisci! */
