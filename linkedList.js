class Node {
  constructor(value) {
    this.value = value; // non "head"! è il contenuto del nodo
    this.next = null;   // inizialmente non punta a nessuno
  }
}


//questo è come si costruisce un nodo


//ora creiamo la linked list

class LinkedList {
  constructor(value) {
    // Creo il primo nodo con quel valore
    const newNode = new Node(value);

    // La testa e la coda sono lo stesso nodo
    this.head = newNode;
    this.tail = newNode;

    // Lunghezza 1 perché abbiamo appena un elemento
    this.length = 1;
  }
   push(value) {
    // 1. Creo un nuovo nodo con il valore
    const newNode = new Node(value);
    if(!this.head){
        this.head=newNode
        this.tail=newNode
    }
    //se la linkedList è vuota , col push creo head che è uguale alla tail

    // 2. Il vecchio tail deve puntare al nuovo nodo,il nodo che prima era coda ora si collega al nuovo nodo. Poi aggiorni this.tail = lastNode
    this.tail.next = newNode;

    // 3. Sposto la "coda" (tail) al nuovo nodo
    this.tail = newNode;

    // 4. Incremento la lunghezza
    this.length++;

    return this; // per permettere chaining (best practice)
  }
   pop() {
    if (!this.head) return undefined;

    let temp = this.head;
    let prev = this.head;

    // Scorriamo fino all'ultimo nodo
    while (temp.next) {
      prev = temp;       // prev "resta indietro"
      temp = temp.next;  // temp avanza
    }

    // Ora:
    // temp = ultimo nodo (tail attuale, da rimuovere)
    // prev = penultimo nodo

    this.tail = prev;     // aggiorno la coda
    this.tail.next = null;// taglio il vecchio ultimo
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return temp; // ritorno il nodo rimosso
  }
  unshift(value) {
  const newNode = new Node(value); // 1. Creo un nuovo nodo

  if (this.length === 0) {
    // 2. Se la lista era vuota, sia head che tail diventano il nuovo nodo
    this.head = newNode;
    this.tail = newNode;
  } else {
    // 3. Collego il nuovo nodo alla vecchia testa,cosi quando creiamo il nuovo elemento dobbiamo puntarlo all'inizio della lista, quindi prima cosa da fare è fare che il prossimo sia il primo elemento delal lista, ovvero la head
    newNode.next = this.head;

    // 4. Sposto la head sul nuovo nodo, dopo aver puntato correttamente, possiamo spostare la head sul nuovo nodo
    this.head = newNode;
  }

  this.length++; // 5. Aggiorno la lunghezza della lista
  return this;
}

getFirst(){
    return this.head
}
getLast(){
    let temp = this.head;       // parto dalla testa
    while (temp.next) {         // finché esiste un nodo dopo temp, se non esiste piu il next significa che sono arrivato all'ultimo nodo ovviamente
        temp = temp.next;       // avanzo al nodo successivo
    }
    return temp;                // temp ora è l'ultimo nodo
}
getElementByIndex(index) {
  // Controllo se l'indice è valido
  if (index < 0 || index >= this.length) return null;

  let temp = this.head; // parto dalla testa

  // Avanzo fino al nodo desiderato
  for (let i = 0; i < index; i++) {
    temp = temp.next;
  }

  return temp; // ritorno il nodo all'indice richiesto
}
set(index, value) {
  // Trovo il nodo all'indice richiesto
  let node = this.getElementByIndex(index);

  // Controllo che esista
  if (node) {
    node.value = value; // aggiorno il valore
    return true;        // aggiornamento riuscito
  }
  
  return false;         // indice non valido
}
insert(index, value) {
  // Inserimento all'inizio
  if (index === 0) return this.unshift(value);

  // Inserimento alla fine
  if (index >= this.length) return this.push(value);

  // Creo il nuovo nodo
  const newNode = new Node(value);

  // Trovo il nodo precedente al punto di inserimento
  const prev = this.getElementByIndex(index - 1);

  // Nodo successivo è quello che prima era dopo prev
  const temp = prev.next;

  // Inserisco il nuovo nodo tra prev e temp
  prev.next = newNode;
  newNode.next = temp;

  this.length++;
  return true;
}
size(){
    return this.length
}
clear() {
    //oppure direttamente this.head=null
  // Continuo a pop fino a quando la lista non è vuota
  while (this.head) {
    this.pop(); // rimuovo l'ultimo nodo
  }
}


}

// ------------------- ESEMPIO -------------------

const list = new LinkedList(10);
list.push(20);
list.push(30);
list.push(40);
list.push(50);

// Struttura iniziale:
// head -> [10] -> [20] -> [30] -> [40] -> [50]
//                                       ↑
//                                     tail

const removed = list.pop();

/*
PASSO PER PASSO DEL while:

1. Inizio:
   temp = [10], prev = [10]

2. Iterazione 1:
   prev = [10], temp = [20]

3. Iterazione 2:
   prev = [20], temp = [30]

4. Iterazione 3:
   prev = [30], temp = [40]

5. Iterazione 4:
   prev = [40], temp = [50] (che è la tail attuale)
   ciclo finisce perché temp.next = null

Fine ciclo:
   - tail diventa prev (cioè [40])
   - [40].next = null
   - temp (cioè [50]) è stato rimosso

Struttura finale:
head -> [10] -> [20] -> [30] -> [40]
                                ↑
                              tail
*/


/*Regola d’oro per ricordare:

Node → contiene value e next.

LinkedList → contiene head, tail e length.
(E in più i metodi tipo append, prepend, insert, ecc.) */
