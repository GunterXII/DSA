Complessità (Big O) — idea centrale

La notazione O (Big O) descrive come cresce il tempo di esecuzione o lo spazio usato da un algoritmo al crescere della dimensione dell’input n. È una misura asintotica: guarda il comportamento per n grandi.
Analogia: quanto tempo impieghi a pulire una stanza mentre entrano sempre più giocattoli? Se ogni giocattolo richiede 1 minuto → tempo ~ O(n). Se la stanza resta sempre uguale e il tempo è sempre 10 minuti → O(1).

Concetti chiave rapidi

O(1) — tempo costante: non dipende da n. (es. leggere arr[0])

O(n) — tempo lineare: cresce proporzionalmente a n. (es. scorrere una lista)

O(n²) — tempo quadratico: tipico di due loop annidati (es. confronto coppie)

O(log n) — tempo logaritmico: divide et impera, es. binary search

O(n log n) — tipico dei migliori algoritmi di ordinamento comparativo (merge/quick avg.)

Amortized — costo medio su molte operazioni (es. push su array dinamico ≈ O(1) ammortizzato)

Space complexity — quanta memoria extra serve oltre all’input (O(1) in-place, O(n) extra array)

Nota: si troncano costanti (O(2n) → O(n)) e si ignorano termini di ordine inferiore (O(n² + n) → O(n²)).

Big-O, Big-Theta, Big-Omega (breve)

Big O (upper bound) — limite superiore asintotico (peggior caso).

Θ (Theta) — limite stretto (best+worst simili).

Ω (Omega) — limite inferiore (miglior caso).

Per gli esami, Big O è spesso quello che ti chiedono (peggior caso).

Regole pratiche per analizzare il codice

Conta le operazioni dominanti (loop, chiamate ricorsive pesanti).

Drop: costanti e termini meno significativi.

Loop annidati → moltiplichi le dimensioni.

Chiamate ricorsive → risolvi la ricorrenza o usa il Master Theorem.

Operazioni su strutture: accesso a indice array O(1); ricerca in array O(n); lookup in hash map in media O(1) (ma worst-case O(n)).

Esempi pratici (JS) — leggi il commento dopo ogni snippet
1) Ricerca lineare — O(n)
function linearSearch(arr, target) {
  for (let i=0; i<arr.length; i++) {
    if (arr[i] === target) return i; // quando lo trovi, esce: best O(1), worst O(n)
  }
  return -1;
}


Spiegazione: potresti trovare l'elemento subito (best O(1)), ma nel peggior caso lo cerchi fino alla fine → O(n).

2) Ricerca binaria — O(log n)

(ricorda: richiede array ordinato)

function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}


Spiegazione: ad ogni passo dimezzi la zona di ricerca → tempo logaritmico.

3) Doppio for annidato — O(n²)
function hasPairSum(arr, sum) {
  for (let i=0; i<arr.length; i++) {
    for (let j=i+1; j<arr.length; j++) {
      if (arr[i] + arr[j] === sum) return true;
    }
  }
  return false;
}


Spiegazione: due cicli che scorrono la stessa struttura → n * n operazioni.

4) Usare una HashMap per migliorare da O(n²) a O(n)
function hasPairSumFast(arr, sum) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(sum - x)) return true;
    seen.add(x);
  }
  return false;
}


Spiegazione: Set lookup ≈ O(1) medio → single loop O(n). Ottimo esempio di trade-off tempo vs spazio (usa O(n) spazio extra).

5) Esempio spazio: in-place vs copia
// in-place reversal — O(1) spazio extra
function reverseInPlace(arr) {
  let i=0, j=arr.length-1;
  while (i<j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++; j--;
  }
}


Qui usi solo poche variabili → O(1) spazio extra. Se invece restituisci una nuova array, spazio O(n).

Tabella rapida (complessità comuni)

O(1) — accesso array per indice, push/pop (stack), assegnazione

O(log n) — binary search, alcune operazioni su heap

O(n) — scansione, somma, ricerca lineare

O(n log n) — merge sort, heap sort, quicksort (avg)

O(n²) — bubble/insertion (peggior caso), algoritmi con nested loops

O(2^n) — esponenziali (subset enumeration, brute force su combinazioni)

O(n!) — permutazioni complete (rare ma ci sono)

Amortized complexity (idea e esempio)

Operazioni che in media costano poco, anche se occasionalmente costano molto.
Esempio: push su array dinamico: quando l'array esaurisce la capacità viene ridimensionato (copia), quella operazione costa O(n), ma succede raramente → costo ammortizzato O(1).

Best practice e consigli d’esame

Conta le operazioni dominanti, non ogni riga.

Spiega il caso peggiore (worst-case) se non è specificato.

Drop constants e minori termini — in esame lo vogliono così.

Conta spazio extra: cambia molto nella scelta di soluzione (es. hash map veloce ma usa memoria).

Controlla le precondizioni (es. binary search richiede array ordinato).

Scegli l’algoritmo adatto al dato: per array piccoli, un algoritmo con costante minore tutto sommato vince; per n grande, O(n log n) >> O(n²).

Leggibilità > micro ottimizzazioni (a meno che il problema non richieda efficienza estrema). Scrivi codice che il reviewer capisce.

Errori/false convinzioni comuni

Confondere n con valore massimo negli elementi. (n = numero di elementi, non valore degli elementi.)

Pensare che HashMap sia sempre O(1) (in worst-case con collisioni può degenerare).

Non considerare lo spazio per l’output: se devi restituire una lista con tutti i sottinsiemi, lo spazio è già enorme → fattore inevitabile.

Ignorare costi di allocazione e garbage collector in ambienti reali: Big O non conta costanti, ma nella pratica contano.

Scaletta rapida per studiare / ripassare (da portare all’esame nella testa)

Sapere definizioni: O, Ω, Θ (1 min).

Regole: drop constants, drop lower-order terms (1 min).

Saper analizzare un for → O(n), nested → O(n²). (5 min)

Ricerca binaria: implementazione e condizione (array ordinato). (10 min)

Capire hash map / set: lookup medio O(1), spazio O(n). (5 min)

Ricorsione: scrivere equazione di ricorrenza (es. merge sort T(n)=2T(n/2)+O(n)). (15 min)

Esempi pratici: implementa linearSearch, binarySearch, hasPairSumFast. (20–30 min)

Ripassare casi particolari: amortized, space complexity, worst vs average. (10 min)

Esercizi pratici veloci (svolgili per fissare)

Scrivi e analizza linearSearch e binarySearch.

Trasforma un algoritmo O(n²) (doppio for) in O(n) usando Map/Set.

Calcola spazio extra per una funzione che ritorna tutte le coppie di elementi (output O(n²)).

Implementa merge sort e dimostra che è O(n log n) (scrivi la ricorrenza).

Mini-trucchetti mnemonici (da fratello maggiore)

Se vedi for dentro for → pensa subito O(n²).

Se vedi divide in metà → pensa log n.

Se c’è un sort + ciclo → di solito O(n log n).

Se usi una struttura che "mappa chiavi" → quasi sempre guadagni tempo a costo di memoria.