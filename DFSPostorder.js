function postOrderIterative(tree) {
  if (!tree || !tree.root) return [];

  const data = [];
  const stack = [tree.root];
  let prev = null; // nodo visitato precedentemente

  while (stack.length) {
    const current = stack[stack.length - 1]; // guarda la cima senza rimuovere

    // 1) stiamo scendendo nell'albero (prev è genitore o null)
    if (!prev || prev.left === current || prev.right === current) {
      // preferiamo scendere a sinistra, se possibile
      if (current.left) {
        stack.push(current.left);
      } else if (current.right) {
        // se non c'è sinistro, scendiamo a destra
        stack.push(current.right);
      } else {
        // foglia: la processiamo (Left e Right sono già "fatti")
        stack.pop();
        data.push(current.value);
      }

    // 2) stiamo risalendo dal figlio sinistro: ora proviamo il figlio destro
    } else if (current.left === prev) {
      if (current.right) {
        stack.push(current.right);
      } else {
        stack.pop();
        data.push(current.value);
      }

    // 3) stiamo risalendo dal figlio destro: processiamo il nodo
    } else if (current.right === prev) {
      stack.pop();
      data.push(current.value);
    }

    // aggiorniamo prev per la prossima iterazione
    prev = current;
  }

  return data;
}
