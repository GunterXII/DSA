class Graph {
  constructor() {
    // adjacencyList è un oggetto dove le proprietà sono i nodi
    // e i valori sono array con i nodi adiacenti (lista di adiacenza).
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    // Aggiunge un nuovo nodo se non esiste già.
    // Se il vertice è già presente non fa nulla (evita sovrascrittura).
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }

  addEdges(vertex1, vertex2) {
    // Aggiunge un arco NON ORIENTATO tra vertex1 e vertex2
    // --- ATTENZIONE ---
    // Questa versione assume che vertex1 e vertex2 esistano nella lista.
    // Se non esistono, il codice lancerà un errore (cannot read property 'push' of undefined).
    this.adjacencyList[vertex1].push(vertex2)
    this.adjacencyList[vertex2].push(vertex1)
  }

  removeVertex(vertex) {
    // Rimuove un vertice e tutte le occorrenze di esso nelle liste degli altri nodi
    for (let nodo in this.adjacencyList) {
      // scorro gli array di adiacenza e rimuovo le occorrenze uguali a `vertex`
      for (let i = 0; i < this.adjacencyList[nodo].length; i++) {
        if (this.adjacencyList[nodo][i] === vertex) {
          // splice rimuove un elemento in posizione i
          // --- ATTENZIONE ---
          // Quando fai splice mentre itera con i crescente potresti saltare elementi
          // subito dopo lo splice: meglio iterare al contrario o usare filter.
          this.adjacencyList[nodo].splice(i, 1)
        }
      }
      // se la proprietà corrente è il vertice da cancellare, lo elimino
      if (nodo === vertex) delete this.adjacencyList[nodo]
    }
  }

  removeEdges(vertex1, vertex2) {
    // Rimuove l'arco tra vertex1 e vertex2
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      // --- BUG LOGICO ---
      // Qui il codice originale fa:
      // this.adjacencyList[vertex1] = this.adjacencyList[vertex2].filter(v => v !== vertex2)
      // this.adjacencyList[vertex2] = this.adjacencyList[vertex1].filter(v => v !== vertex1)
      //
      // Questo è sbagliato perché:
      // 1) filtri la lista di vertex2 e assegni il risultato a vertex1 (errore di riferimento),
      // 2) poi usi la nuova lista di vertex1 per filtrare vertex2 — perdi dati e ti ritrovi liste sbagliate.
      //
      // L'intenzione corretta è: rimuovere vertex2 dalla lista di vertex1 e
      // rimuovere vertex1 dalla lista di vertex2, ciascuna filtrata sulla propria lista originale.
      this.adjacencyList[vertex1] = this.adjacencyList[vertex2].filter(v => v !== vertex2)
      this.adjacencyList[vertex2] = this.adjacencyList[vertex1].filter(v => v !== vertex1)
    }
  }
}
