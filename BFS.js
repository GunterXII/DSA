function BSF(Tree){ // breadt h-first search (meglio chiamarla "bfs")
  // prendiamo la radice dell'albero su cui fare la ricerca
  let current = Tree.root

  // "queue" è la coda che tiene i nodi da visitare (FIFO)
  let queue = []

  // "data" è l'array dei valori che raccogliamo nell'ordine di visita
  let data = []

  // mettiamo la radice nella coda per partire
  queue.push(current)

  // finché la coda non è vuota
  while (queue.length) {
    // togliamo il primo elemento dalla coda (FIFO)
    current = queue.shift()

    // aggiungiamo il valore del nodo corrente ai risultati
    data.push(current.value)

    // se esiste figlio sinistro lo accodiamo (verrà visitato dopo gli altri dello stesso livello)
    if (current.left) {
      queue.push(current.left)
    }

    // se esiste figlio destro lo accodiamo
    if (current.right) {
      queue.push(current.right)
    }
  }

  // ritorniamo l'ordine di visita (livello per livello)
  return data
}
/*   5
     / \
    3   8
   /   / \
  1   7   9
Stato iniziale (prima del primo while)
queue = [5] (hai fatto queue.push(current) con current = Tree.root)

data = []

Iterazione 1
queue prima di shift(): [5]

current = queue.shift() → current = 5 ; ora queue = []

data.push(current.value) → data = [5]

accodo figli di 5: current.left = 3 → queue.push(3), poi current.right = 8 → queue.push(8)

queue dopo le operazioni: [3, 8]

Riassunto riga: ho visitato 5, poi messo in coda 3 e 8.

Iterazione 2
queue prima di shift(): [3, 8]

current = queue.shift() → current = 3 ; ora queue = [8]

data.push(3) → data = [5, 3]

figli di 3: left = 1 (esiste) → queue.push(1) ; right non c’è → niente.

queue dopo: [8, 1]

Riassunto: visitato 3, accodato 1 (8 resta davanti).

Iterazione 3
queue prima di shift(): [8, 1]

current = queue.shift() → current = 8 ; ora queue = [1]

data.push(8) → data = [5, 3, 8]

figli di 8: left = 7 → queue.push(7), right = 9 → queue.push(9)

queue dopo: [1, 7, 9]

Riassunto: visitato 8, accodati 7 e 9.

Iterazione 4
queue prima di shift(): [1, 7, 9]

current = queue.shift() → current = 1 ; ora queue = [7, 9]

data.push(1) → data = [5, 3, 8, 1]

figli di 1: nessuno → non accodo nulla

queue dopo: [7, 9]

Riassunto: visitato 1, non c’erano figli.

Iterazione 5
queue prima di shift(): [7, 9]

current = queue.shift() → current = 7 ; ora queue = [9]

data.push(7) → data = [5, 3, 8, 1, 7]

figli di 7: nessuno → queue rimane [9]

Riassunto: visitato 7.

Iterazione 6
queue prima di shift(): [9]

current = queue.shift() → current = 9 ; ora queue = []

data.push(9) → data = [5, 3, 8, 1, 7, 9]

figli di 9: nessuno → queue rimane []

Riassunto: visitato 9; la coda è vuota → esco dal while.

Fine
queue.length è 0 → ciclo finito.

Funzione ritorna data = [5, 3, 8, 1, 7, 9] (visita livello-per-livello). */