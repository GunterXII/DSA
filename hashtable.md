Che cos’è la chiave e che cos’è il valore

Chiave: l’identificatore (es. il nome “Mario Rossi” o un numero di telefono) — può essere stringa, numero, ecc.

Valore: ciò che vogliamo memorizzare (es. il vero numero di telefono, un oggetto contatto).

La hash table tiene coppie chiave → valore.

Hash function (concetto, senza entrare nei dettagli matematici)

È una funzione che prende un input di dimensione arbitraria (es. una stringa) e restituisce un output a lunghezza fissa (es. un numero).

Proprietà importanti: deterministica (stessa chiave → stesso hash), veloce, e dovrebbe distribuire le chiavi uniformemente per ridurre collisioni.

Il risultato (hash code) viene poi mappato su un indice dell’array (es. hash % arrayLength).

Hashing = mappare chiavi arbitrarie → indici fissi

Questo processo è chiamato hashing.

Esempio concettuale: “Mario Rossi” → hash 12345 → indice 12345 % 100 = 45 → metti la coppia nel bucket 45.

Struttura fisica: array di bucket

L’implementazione tipica è un array. Ogni posizione dell’array è un bucket.

Un bucket può contenere un singolo elemento o una lista di elementi (dipende dalla strategia di collisione).

Inserimento (procedura semplificata)

Calcoli l’hash della chiave.

Converti l’hash in indice (modulo lunghezza array).

Vai al bucket corrispondente.

Se è vuoto → inserisci la coppia.

Se c’è già qualcosa → gestisci la collisione (vedi punto 7).

Nota del tuo appunto: “wrappa il dato in [[]]” — questo descrive il caso del chaining dove il bucket è una lista (es. [[chiave,valore], [chiave2,valore2]]).

Ricerca (lookup)

Calcoli l’hash della chiave, trovi l’indice, controlli il bucket.

Se il bucket è una lista, cerchi linearmente la chiave dentro quella lista e ritorni il valore.

In media è O(1); nel peggiore dei casi (tante collisioni) può degradare a O(n).

Collisioni: cosa sono e come risolverle (due approcci principali)

Collisione = due chiavi diverse mappano allo stesso indice.

Soluzioni comuni:

Chaining (catena): ogni bucket è una lista (o altra struttura) che può contenere più coppie. Quando collisione, aggiungi l’elemento alla lista del bucket. Questo è quello che descrive il tuo [[]].

Pro: semplice, facile da implementare; la tabella non ha bisogno di cercare un'altra cella libera.

Contro: se le liste si ingrossano, le ricerche nel bucket diventano lente.

Open addressing (indirizzamento aperto): invece di liste, se il bucket è occupato si cerca un’altra posizione libera nell’array (es. linear probing, quadratic probing, double hashing).

Pro: niente strutture esterne, tutto nell’array.

Contro: clustering e più complesso da gestire (specialmente per la cancellazione).

Scegli chaining per semplicità quando studi; è il modo più intuitivo.

Load factor e resizing

Load factor (α) = numero di elementi / dimensione dell’array.

Se α diventa troppo alto (es. > 0.7), le collisioni aumentano — si riduce la performance.

Soluzione: ridimensionare l’array (es. raddoppiare la capacità) e rehashare tutti gli elementi (ri-calcolare gli indici con la nuova dimensione).

Complessità (intuitiva)

Media: inserimento/ricerca/cancellazione ≈ O(1).

Peggiore: O(n) (tutte le chiavi finiscono nello stesso bucket o l’array è piccolo senza resize).

Perché nella pratica si ottiene O(1): le hash function e il mantenimento di un load factor basso mantengono i bucket piccoli.

Altri punti utili

Le chiavi devono poter essere trasformate in un hash; per oggetti complessi serve una strategia di hashing o una chiave derivata (es. ID).

Le hash table non garantiscono ordine degli elementi (non sono ordinate come mappe ordinate).

Sono molto usate per: dizionari, set, caching, ricerche rapide per ID/username, conteggi di frequenza ecc.

Esempio concettuale (telefono)

Voglio memorizzare numeri di telefono usando il nome come chiave.

Calcolo hash("Anna Bianchi") → 87432.

Indice = 87432 % arraySize (es. 100) = 32.

Vado al bucket 32:

Se vuoto: inserisco ["Anna Bianchi", "+39 333 ..."].

Se già presente altro: aggiungo alla lista del bucket 32 (chaining).

Per cercare il numero: stesso processo — arrivo al bucket 32 e cerco la chiave dentro la lista.

2–3 regole rapide / trucchi mnemonici

H.A.S.H.

H = Hash function (trasforma la chiave)

A = Array (dove metto gli elementi)

S = Slots/buckets (posizioni dell’array, possono contenere liste)

H = Handle collisions (gestisci collisioni: chaining o open addressing)

Ricorda: deterministica = ripetibile (stessa chiave → stesso hash).

Regola pratica: se il load factor cresce, ridimensiona e re-hasha — non aspettare che la tabella diventi lenta.

Perché usiamo l’hash invece di mettere direttamente la chiave nell’indice (es. usare la stringa come indice)?Hint più esplicito: gli array richiedono numeri interi come indice; le chiavi spesso non lo sono.

Soluzione: l’hash converte la chiave in un numero adatto come indice; le chiavi possono essere di qualsiasi tipo e variabili in lunghezza.

Se due nomi diversi finiscono nello stesso indice in una hash table che usa chaining, cosa succede quando inserisci il secondo?
Hint più esplicito: aggiungi l’elemento al bucket; la ricerca scorre la lista cercando la chiave corretta.

Soluzione: il bucket conterrà entrambe le coppie (es. [[k1,v1],[k2,v2]]); alle ricerche si cerca linearmente il matching della chiave.