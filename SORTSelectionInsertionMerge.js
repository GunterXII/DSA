// BUBBLE SORT (in-place)
// Idea: ripeti scansioni dell'array; in ogni scansione "bolle" verso destra
// gli elementi più grandi scambiandoli con i vicini.
// Nota: questa versione modifica l'array originale e non ritorna nulla.
// Ottimizzazione: se in una passata non avviene alcuno swap, l'array è già ordinato.
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swapped = false; // ottimizzazione: ci permette di fermare prima
    // l'ultimo elemento utile dopo i passaggi è già in posizione (i elementi finali sono ordinati)
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // scambio in-place usando destructuring
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // se non ho swap, l'array è già ordinato → esco
  }
  // opzionale: return arr; (comodo per concatenare o test)
}

// SELECTION SORT (in-place)
// Idea: per ogni posizione i, trova l'indice del minimo tra i..end e scambia
// con arr[i]. Fa al massimo n-1 scambi.
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    // cerco il minimo nel resto dell'array
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    // scambio (anche se min === i funziona comunque)
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  // opzionale: return arr;
}

// INSERTION SORT (in-place, stabile)
// Idea: costruisco l'array ordinato a sinistra, prendo un elemento e lo inserisco
// nella posizione corretta spostando gli altri a destra.
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    // sposto a destra finché trovo valori più grandi
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    // inserisco il valore nella posizione corretta
    arr[j + 1] = current;
  }
  // opzionale: return arr;
}

// MERGE SORT (divide & conquista) — richiede la funzione merge
// Idea: dividi l'array a metà, ordina ricorsivamente le metà, poi fondile.
function mergeSort(arr) {
  if (arr.length < 2) return arr; // array di 0 o 1 elemento già ordinato
  let mid = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, mid);
  let rightArr = arr.slice(mid);
  // mergeSort ritorna nuovi array; il merge produce un array nuovo e ordinato
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

// Funzione di merge (prende due array ordinati e li fonde)
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  // confronto frontali di left e right e spingo il più piccolo
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  // aggiungo i rimanenti (uno dei due sarà vuoto)
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}
