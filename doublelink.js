
// Nodo base per una Doubly Linked List
class Node {
  constructor(value) {
    // valore contenuto nel nodo
    this.value = value
    // riferimento al nodo successivo (null se non esiste)
    this.next = null
    // riferimento al nodo precedente (null se non esiste)
    this.prev = null
  }
}

// Lista doppiamente concatenata
class DoublyLinkedList {
  /**
   * Se passi un valore iniziale, la lista partirà con un nodo.
   * Altrimenti verrà creata vuota (head e tail a null, length = 0).
   */
  constructor(initialValue) {
    if (initialValue === undefined) {
      this.head = null
      this.tail = null
      this.length = 0
    } else {
      const newNode = new Node(initialValue)
      this.head = newNode
      this.tail = newNode
      this.length = 1
    }
  }

  /**
   * push(value)
   * Aggiunge un nodo in coda. (O(1))
   * - Se la lista è vuota, head e tail puntano al nuovo nodo.
   * - Altrimenti colleghiamo last->next al nuovo nodo e newNode.prev alla tail.
   */
  push(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      // collega la coda corrente al nuovo
      this.tail.next = newNode
      newNode.prev = this.tail
      // aggiorna la coda
      this.tail = newNode
    }
    this.length++
    return this // ritorniamo la lista per chaining se vuoi
  }

  /**
   * pop()
   * Rimuove l'ultimo nodo e lo ritorna. (O(1))
   * - Se la lista è vuota -> undefined
   * - Se length === 1 -> azzera head e tail
   * - Altrimenti stacca la coda e aggiorna i riferimenti
   */
  pop() {
    if (this.length === 0) return undefined

    const removed = this.tail

    if (this.length === 1) {
      // unico elemento: lista diventa vuota
      this.head = null
      this.tail = null
    } else {
      // spostiamo la coda al nodo precedente
      this.tail = removed.prev
      // rimuoviamo il riferimento dalla nuova coda al vecchio
      this.tail.next = null
      // stacchiamo i riferimenti del nodo rimosso (aiuta GC)
      removed.prev = null
    }

    this.length--
    return removed
  }

  /**
   * unshift(value)
   * Inserisce un nodo all'inizio (head). (O(1))
   * - Se la lista è vuota si comporta come push.
   */
  unshift(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.length++
    return this
  }

  /**
   * shift()
   * Rimuove il primo nodo e lo ritorna. (O(1))
   */
  shift() {
    if (this.length === 0) return undefined

    const removed = this.head

    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = removed.next
      this.head.prev = null
      removed.next = null
    }

    this.length--
    return removed
  }
  reverse(){
  // gestire i casi banali: lista vuota o con 1 elemento
  if (this.length <= 1) return this;

  let temp = this.head;
  // scambia head e tail
  this.head = this.tail;
  this.tail = temp;

  let temp2 = null;
  // iteriamo esattamente `length` volte, processiamo ogni nodo una volta
  for (let i = 0; i < this.length; i++) {
    temp2 = temp.next;      // salva il "next" originale
    temp.next = temp.prev;  // scambia next <- prev
    temp.prev = temp2;      // scambia prev <- next originale
    // AVANZAMENTO CORRETTO: dopo lo scambio, prev ora punta al nodo originale next
    temp = temp.prev;
  }

  return this; // comodo per chaining
}

}