// Classe Node: rappresenta un singolo elemento della linked list
// Ogni nodo contiene un valore e un riferimento al prossimo nodo (next)
class Node{
    constructor(value){
        // memorizza il valore passato quando si crea il nodo
        this.value = value;
        // 'next' punta al nodo successivo nella lista; inizialmente è null
        this.next = null;
    }
}

// Classe Stack: implementazione di uno stack usando nodi collegati (linked list)
class Stack {
    constructor(value){
        // quando creiamo uno stack lo inizializziamo con un nodo iniziale
        const newNode = new Node(value); // creiamo un nodo contenente il valore iniziale
        this.first = newNode                 // 'first' punta sempre all'elemento in cima allo stack
        this.length = 1                      // teniamo traccia della lunghezza: qui è 1 perché abbiamo creato il primo nodo
    }

    // push: inserisce un nuovo valore in cima allo stack
    push(value){
        const newNode = new Node(value)     // creiamo un nuovo nodo con il valore da inserire
        if(this.length === 0){              // se lo stack fosse vuoto (caso iniziale alternativo)
            this.first = newNode           // il nuovo nodo diventa il primo
        } else {
            newNode.next = this.first      // colleghiamo il nuovo nodo al vecchio primo
            this.first = newNode           // aggiornamo 'first' perché ora la cima è il nuovo nodo
        }
        this.length++                      // aggiorniamo la lunghezza (+1)
    }

    // pop: rimuove e 'togli' il valore in cima allo stack
    pop(){
        let temp = this.first              // salviamo temporaneamente il nodo che sta in cima (lo rimuoveremo)
        if(this.length === 0){             // se lo stack è vuoto non c'è nulla da rimuovere
            return undefined               // convenzione: ritorniamo undefined per indicare "niente da poppare"
        }
        this.first = this.first.next       // spostiamo il puntatore 'first' al nodo successivo (rimuovendo di fatto la cima)
        temp.next = null                   // stacchiamo il nodo rimosso dalla lista per non lasciare riferimenti
        this.length--                      // decrementiamo la lunghezza (-1)
        // Nota: il metodo non restituisce esplicitamente il valore rimosso. Se vuoi il valore, potresti fare: return temp.value
    }

    // min: trova e ritorna il valore minimo contenuto nello stack
    min(){
        if(!this.length){                  // se lo stack è vuoto
            return undefined               // non c'è un minimo da restituire
        }

        let temp = this.first              // usiamo 'temp' per scorrere la lista senza perdere 'first'
        let min = temp.value               // inizializziamo 'min' con il valore del primo nodo (cima dello stack)

        // scorriamo tutti i nodi finché 'temp' esiste
        while(temp){
            if(temp.value < min){         // se troviamo un valore più piccolo di 'min'
                min = temp.value          // aggiorniamo 'min'
            }
            temp = temp.next               // passiamo al nodo successivo
        }

        return min                         // alla fine ritorniamo il minimo trovato
    }

}

// Classe Queue: implementazione di una coda (FIFO) usando nodi collegati
class Queue {
    constructor(value){
        // inizializziamo la coda con un nodo iniziale
        const newNode = new Node(value); // creiamo il nodo iniziale
        this.first = newNode             // 'first' punta al primo elemento della coda (chi sta davanti)
        this.last = newNode              // 'last' punta all'ultimo elemento (chi è arrivato per ultimo)
        this.length = 1                  // lunghezza iniziale 1
    }

    // enqueue: aggiunge un elemento in fondo alla coda
    enqueue(value){
        const newNode = new Node(value)  // creiamo il nuovo nodo da aggiungere
        if(this.length === 0){           // se la coda è vuota
            this.first = newNode        // il nuovo nodo è sia il primo
            this.last = newNode         // sia l'ultimo
        }
        // se la coda non è vuota (caso normale): colleghiamo il vecchio 'last' al nuovo nodo
        this.last.next = newNode
        this.last = newNode             // aggiorniamo 'last' perché ora è il nuovo nodo
        this.length++                   // aumentiamo la lunghezza
    }

    // dequeue: rimuove e toglie l'elemento davanti nella coda
    dequeue(){
        if(this.length === 0){          // se la coda è vuota non c'è nulla da togliere
            return undefined
       }
       let temp = this.first           // salviamo temporaneamente il nodo che rimuoveremo
       this.first = this.first.next    // spostiamo 'first' al nodo successivo
       temp.next = null                // stacchiamo il nodo rimosso
       this.length--                   // decrementiamo la lunghezza
       // Nota: come per pop(), se vuoi il valore rimosso puoi fare 'return temp.value'
    }
        
}

/*
  SCALETTA (trace) — prendiamo il metodo 'min' dello Stack e vediamo cosa succede iterazione per iterazione

  Esempio di preparazione dello stack:
  1) const s = new Stack(3)
     Stato lista: first -> 3
     length = 1

  2) s.push(1)
     Stato lista: first -> 1 -> 3
     length = 2

  3) s.push(4)
     Stato lista: first -> 4 -> 1 -> 3
     length = 3

  4) s.push(2)
     Stato lista: first -> 2 -> 4 -> 1 -> 3
     length = 4

  Ora chiamiamo s.min() — vogliamo trovare il valore minimo nella lista: i nodi sono [2, 4, 1, 3]

  Inizializzazione del metodo:
    temp = this.first    // punta al nodo con valore 2
    min = temp.value     // min = 2

  Iterazione 1 (prima iterazione del while):
    temp.value = 2
    confronto: 2 < min(2) ? no  -> min rimane 2
    temp = temp.next     // ora temp punta al nodo con valore 4

  Iterazione 2:
    temp.value = 4
    confronto: 4 < min(2) ? no  -> min rimane 2
    temp = temp.next     // ora temp punta al nodo con valore 1

  Iterazione 3:
    temp.value = 1
    confronto: 1 < min(2) ? sì -> min = 1  (aggiorniamo il minimo)
    temp = temp.next     // ora temp punta al nodo con valore 3

  Iterazione 4:
    temp.value = 3
    confronto: 3 < min(1) ? no  -> min rimane 1
    temp = temp.next     // ora temp diventa null (fine della lista)

  Uscita dal while (temp è null)
  return min  // restituisce 1

  NOTE UTILI per studiare:
  - 'temp' è solo un puntatore di lavoro: non modifica la struttura permanente, serve solo per scorrere
  - inizializzare 'min' con il primo valore evita di dover usare valori iniziali strani (come Infinity)
  - complessità temporale di min(): O(n) — si visita ogni nodo una sola volta
  - per push/pop la complessità è O(1): si modificano solo i riferimenti iniziali senza scorrere la lista
*/
