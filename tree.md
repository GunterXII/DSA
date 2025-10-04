1) Terminologia base

Nodo (node): ogni elemento dell’albero (contiene dato + puntatori ai figli).

Arco / link (edge): la connessione tra due nodi.

Radice (root): il primo nodo, quello senza genitore.

Genitore (parent): nodo che punta a un altro.

Figlio (child): nodo puntato dal genitore.

Foglia (leaf): nodo senza figli.

Sottoalbero (subtree): l’albero che ha un nodo come radice.

Altezza (height): numero di livelli dall’alto verso il basso (a volte contata come numero di archi nel percorso più lungo).

2) Tipi di alberi binari (chiarimenti importanti)

Albero binario: ogni nodo può avere al massimo due figli (left e right).

Full (o proper) binary tree: ogni nodo ha esattamente 0 o 2 figli. Quindi nessun nodo ha solo 1 figlio.

Perfect binary tree: è full e tutte le foglie sono allo stesso livello (stessa distanza dalla radice). Ogni livello è completamente pieno.
→ Un perfect tree è anche completo e full.

Complete binary tree: tutti i livelli, tranne forse l’ultimo, sono completamente pieni; l’ultimo livello è riempito da sinistra verso destra (senza buchi tra i nodi).
→ Non significa che ogni nodo abbia 2 figli; l’ultimo livello può avere foglie mancanti a destra.

Nota: nella tua versione c’era confusione tra completo/perfetto. Ricorda: perfect = tutte le foglie allo stesso livello e ogni nodo interno ha 2 figli. Complete = tutti i livelli pieni tranne l’ultimo, che è riempito left→right.

3) Binary Search Tree (BST) — concetto

Proprietà: per ogni nodo N:

tutti i valori nel sottoalbero sinistro sono < N.val (o ≤ se permetti duplicati con convenzione),

tutti i valori nel sottoalbero destro sono > N.val (o ≥ con convenzione).

Questo ordina i valori in modo che la ricerca di un elemento segua un percorso simile alla ricerca binaria.

4) Inserimento in un BST — logica (senza codice)

Parto dalla radice.

Confronto il valore da inserire v con il valore del nodo corrente curr:

se v < curr → vai a sinistra;

se v > curr → vai a destra.

Se lo spazio (left o right) è libero → inserisco lì.

Altrimenti ripeti dal passo 2 sul figlio corrispondente.

5) Esempio pratico (sequenza: 5, 3, 8, 1, 7, 9)

Inserisco 5 → diventa radice.

Inserisco 3 → 3 < 5 → va a sinistra di 5.

Inserisco 8 → 8 > 5 → va a destra di 5.

Inserisco 1 → 1 < 5 → vado a sinistra (c’è 3). 1 < 3 → va a sinistra di 3.

Inserisco 7 → 7 > 5 → vado a destra (c’è 8). 7 < 8 → va a sinistra di 8.

Inserisco 9 → 9 > 5 → destra (8). 9 > 8 → destra di 8.

Diagramma ASCII finale:

      5
     / \
    3   8
   /   / \
  1   7   9