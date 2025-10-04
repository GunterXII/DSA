class Node{
    constructor(value){
        this.value = value;
        this.right=null
        this.left=null
    }
}
class Tree{
    constructor(){
        this.root = null
    }
    insert(value) {
  const newNode = new Node(value);

  // Se l'albero è vuoto, la nuova radice è il nuovo nodo.
  // IMPORTANTISSIMO: dopo aver creato la root dobbiamo uscire
  // dal metodo (return), altrimenti entriamo nel while e
  // la funzione creerà un conflitto (il nodo si confronta con se stesso).
  if (!this.root) {
    this.root = newNode;
    return this;           // <- non dimenticarlo
  }

  // current è il puntatore che useremo per "scendere" nell'albero.
  // Partiamo dalla radice e spostiamo current verso sinistra o destra
  // fino a trovare un posto libero dove attaccare newNode.
  let current = this.root;

  // while(true) crea un loop infinito voluto: la funzione termina sempre
  // tramite un `return` interno quando trova il posto giusto.
  // È essenzialmente un "loop finché non troviamo la soluzione".
  while (true) {

    // Caso: valore identico — qui decidiamo di non inserire duplicati.
    // Ritorniamo undefined per segnalare che non è stato inserito.
    if (newNode.value == current.value) {
      return undefined;
    }

    // Se il valore da inserire è minore del nodo corrente → vai a sinistra
    if (newNode.value < current.value) {

      // Se il figlio sinistro è vuoto, inserisci il nuovo nodo lì e termina
      if (!current.left) {
        current.left = newNode;
        return this;         // inserimento completato → esci dalla funzione
      } else {
        // Altrimenti scendi a sinistra e ripeti il confronto con il nuovo current
        current = current.left;
      }

    } else { // altrimenti (newNode.value > current.value) → vai a destra

      // Se il figlio destro è vuoto, inserisci e termina
      if (!current.right) {
        current.right = newNode;
        return this;         // inserimento completato → esci
      } else {
        // Altrimenti scendi a destra e continua il loop
        current = current.right;
      }
    }
  }
}
includes(target) {
    let current = this.root;

    while (current) {               // finché esiste un nodo scorri solo nodi esistenti, niente loop infinito.
        if (target == current.value) return true; // trovato
        if (target < current.value) {
            current = current.left; // scendi a sinistra
        } else {
            current = current.right; // scendi a destra
        }
    }

    return false; // se esci dal while → non trovato
}


    }
