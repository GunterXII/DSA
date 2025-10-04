// DFS - Preorder (Node, Left, Right) iterativo usando uno stack
function DFS(tree) {
  // se l'albero è vuoto, non c'è nulla da visitare
  if (!tree || !tree.root) return [];

  const data = [];           // qui mettiamo i valori nell'ordine di visita
  const stack = [tree.root]; // inizializziamo lo stack con la radice

  // finché ci sono nodi da processare
  while (stack.length) {
    // poppiamo l'ultimo nodo (LIFO) e lo visitamo subito (Node)
    const current = stack.pop();
    data.push(current.value); // VISITA: aggiungo il valore corrente

    // Per garantire l'ordine Preorder (Node, Left, Right)
    // dobbiamo pushare PRIMA il right e POI il left.
    // Così il left sarà in cima allo stack e verrà processato per primo.
    if (current.right) stack.push(current.right);
    if (current.left)  stack.push(current.left);
  }

  return data; // ritorniamo l'ordine di visita
}
/*Perché funziona così (concetto semplice)

In preorder visiti il nodo appena lo incontri. Con lo stack il "incontrare" corrisponde al pop().

Dopo aver visitato, vuoi che il sottoalbero sinistro venga esplorato prima del destro. Poiché lo stack è LIFO, devi mettere il destro prima e il sinistro dopo.

Ripeti finché lo stack è vuoto.

Trace passo-passo sull’albero d’esempio

Albero:

      5
     / \
    3   8
   /   / \
  1   7   9


Preorder atteso: [5, 3, 1, 8, 7, 9]

Stato iniziale:

stack = [5]

data = []

Iterazione 1:

pop 5, data = [5]

push right 8, poi left 3 → stack = [8, 3]

Iterazione 2:

pop 3, data = [5, 3]

push right (none), left 1 → stack = [8, 1]

Iterazione 3:

pop 1, data = [5, 3, 1]

1 non ha figli → stack = [8]

Iterazione 4:

pop 8, data = [5, 3, 1, 8]

push right 9, poi left 7 → stack = [9, 7]

Iterazione 5:

pop 7, data = [5, 3, 1, 8, 7]

7 non ha figli → stack = [9]

Iterazione 6:

pop 9, data = [5, 3, 1, 8, 7, 9]

fine → stack = [] → return [5,3,1,8,7,9]

Nota sulle varianti

Preorder: Node, Left, Right (come sopra).

Inorder: Left, Node, Right — utile per stampare i BST in ordine crescente.

Postorder: Left, Right, Node — utile per cancellazioni, ecc.
Con stack l’implementazione cambia leggermente (specialmente inorder/postorder). */