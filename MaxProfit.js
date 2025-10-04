/**
 * maxProfit-notes.js
 *
 * Versione commentata passo-passo dell'algoritmo "Best Time to Buy and Sell Stock I".
 * - Implementa la funzione `maxProfit(prices, { verbose })`
 * - Tutto è documentato in italiano direttamente nel file, con una "scaletta" commentata
 *   che spiega cosa succede giorno per giorno (utile per studiare).
 *
 * Esempio d'uso in fondo al file.
 */

/**
 * maxProfit(prices, options)
 *
 * INPUT:
 *  - prices: array di numeri (prezzi dell'azione per ogni giorno, indice = giorno)
 *  - options (opzionale): { verbose: true } per stampare una tabella passo-passo
 *
 * OUTPUT:
 *  - numero (massimo profitto ottenibile comprando una volta e vendendo una volta dopo)
 *
 * COMPLESSITÀ:
 *  - Time:  O(n)  -> scorriamo l'array una sola volta
 *  - Space: O(1)  -> uso costante di memoria aggiuntiva (qualche variabile)
 */
function maxProfit(prices, { verbose = false } = {}) {
  // Caso base: se non ci sono almeno 2 giorni, non puoi fare profitto
  if (!Array.isArray(prices) || prices.length < 2) return 0;

  // minPrice = prezzo minimo visto "finora" (lo assumiamo inizialmente uguale al primo giorno)
  let minPrice = prices[0];

  // maxProfit = il miglior profitto trovato finora
  let maxProfit = 0;

  // (opzionale) teniamo traccia dei giorni di acquisto/vendita corrispondenti all'attuale max
  let bestBuyDay = 0;
  let bestSellDay = 0;

  // (opzionale) se verbose vogliamo accumulare i passi per poi stamparli in forma tabellare
  const steps = [];

  // Scorriamo i prezzi a partire dal giorno 1 (il giorno 0 l'abbiamo già considerato)
  for (let day = 1; day < prices.length; day++) {
    const price = prices[day];

    // 1) Aggiorniamo minPrice: se il prezzo di oggi è più basso, sarebbe meglio aver comprato oggi
    //    minPrice = min(minPrice, price)
    if (price < minPrice) {
      minPrice = price;
      // se volessimo anche segnare il giorno di 'minPrice', potremmo salvare qui il buyDay.
    }

    // 2) Calcoliamo il profitto potenziale se comprassimo al minPrice e vendessimo oggi
    const potentialProfit = price - minPrice;

    // 3) Se il potentialProfit è migliore del maxProfit registrato, aggiorniamo
    if (potentialProfit > maxProfit) {
      maxProfit = potentialProfit;
      // Salviamo i giorni corrispondenti (opzionale ma utile per debug/compresione)
      // buyDay è l'indice del giorno in cui il minPrice è stato stabilito,
      // qui non salviamo direttamente buyDay in questa versione minimale,
      // ma potremmo farlo tenendo traccia del giorno in cui abbiamo aggiornato minPrice.
      bestSellDay = day;
      // bestBuyDay potremmo determinarlo se avessimo tenuto la storia di minPrice day.
    }

    // Se verbose, salviamo lo stato di questo giorno per stamparlo dopo
    if (verbose) {
      steps.push({
        day,
        price,
        minPriceSoFar: minPrice,
        potentialProfit,
        maxProfitSoFar: maxProfit,
      });
    }
  }

  // Se verbose, mostriamo una tabella in console per aiutare lo studio
  if (verbose) {
    console.log("=== Tabella passo-passo (day, price, minSoFar, potentialProfit, maxProfitSoFar) ===");
    console.table(steps);
    console.log(`Risultato: maxProfit = ${maxProfit} (bestSellDay indicativo = ${bestSellDay})`);
    console.log("Nota: per ricavare esattamente il giorno di acquisto, servirebbe tracciare anche when minPrice changed.");
  }

  // Restituiamo solo il profitto massimo (firma classica del problema)
  return maxProfit;
}

/* ===========================================================
   SCALLETTA COMMENTATA (come studiarla / cosa succede passo-passo)
   ===========================================================
   Questa è LA SCALLETTA che devi imparare: la versione "in parole" di quello
   che succede dentro il loop quando scorri i giorni.

   PARTENZA:
   - prendi il prezzo del giorno 0 e imposta:
       minPrice = prices[0]
       maxProfit = 0

   PER OGNI giorno i (da 1 a n-1):
   1) Leggi price = prices[i]
   2) Se price < minPrice allora
        - significa che abbiamo trovato un giorno più economico per comprare,
        - aggiorna minPrice = price
      (questo ci permette di considerare sempre la migliore opportunità di acquisto
       vista fino ad oggi)
   3) Calcola potentialProfit = price - minPrice
      - cioè quanto guadagneremmo se vendessimo proprio oggi avendo comprato al minPrice
   4) Se potentialProfit > maxProfit allora
        - aggiorna maxProfit = potentialProfit
        - (opzionale) registra i giorni buy/sell corrispondenti
   5) Passa al giorno successivo

   FINE:
   - Dopo aver visto tutti i giorni, maxProfit contiene il massimo guadagno ottenibile
     comprando una volta e vendendo una volta dopo la data di acquisto.

   Perché funziona:
   - minPrice tiene la migliore (più bassa) opportunità di acquisto osservata fino al giorno corrente.
   - ogni giorno consideriamo "e se vendessi oggi?" calcolando price - minPrice.
   - maxProfit tiene il valore massimo di tutte queste considerazioni.
*/

/* ===========================================================
   ESEMPIO DETTAGLIATO (manuale) SUL VETTORE [7,1,5,3,6,4]
   ===========================================================
   Qui spiego giorno-per-giorno cosa succede internamente.
   Questo è ciò che otterresti impostando verbose = true.

   prices: [7, 1, 5, 3, 6, 4]

   Inizializzazione:
     minPrice = 7
     maxProfit = 0

   Giorno 1 (index 1) price = 1
     price < minPrice ? sì -> minPrice = 1
     potentialProfit = 1 - 1 = 0
     maxProfit = max(0, 0) = 0

   Giorno 2 (index 2) price = 5
     price < minPrice ? no (5 >= 1)
     potentialProfit = 5 - 1 = 4
     maxProfit = max(0, 4) = 4   <-- miglioramento

   Giorno 3 (index 3) price = 3
     price < minPrice ? no (3 >= 1)
     potentialProfit = 3 - 1 = 2
     maxProfit = max(4, 2) = 4   <-- rimane 4

   Giorno 4 (index 4) price = 6
     price < minPrice ? no (6 >= 1)
     potentialProfit = 6 - 1 = 5
     maxProfit = max(4, 5) = 5   <-- miglioramento (compra a 1, vendi a 6)

   Giorno 5 (index 5) price = 4
     price < minPrice ? no (4 >= 1)
     potentialProfit = 4 - 1 = 3
     maxProfit = max(5, 3) = 5   <-- rimane 5

   Risultato: maxProfit = 5  (comprare a prezzo 1 e vendere a prezzo 6)
*/

/* ===========================================================
   VARIANTI IMPORTANTI (da conoscere per l'esame)
   ===========================================================
   1) Se ti fosse permesso fare più transazioni (compra/vendi più volte),
      la strategia ottimale semplice è: somma tutte le differenze positive
      tra giorni consecutivi (equivale a vendere ogni volta che il prezzo sale).
      Complessità: O(n).

   2) Se volessi ottenere i giorni esatti di acquisto/vendita:
      - tieni traccia dell'indice in cui minPrice è stato aggiornato (buyIndex)
      - quando aggiorni maxProfit, salva buyIndex e current day come sellIndex.

   3) Edge cases:
      - prezzi decrescenti (es [7,6,4,3]) => maxProfit = 0 (non conviene comprare)
      - array vuoto o 1 elemento => maxProfit = 0

   4) Motivazione matematica:
      - Stiamo essenzialmente cercando il massimo valore di (prices[j] - prices[i])
        con j > i. L'algoritmo online che mantiene minPrice è ottimo perché
        minimizza il problema locale ad ogni passo senza dover provare tutte le coppie.
*/

/* ===========================================================
   ESEMPIO DI ESECUZIONE (puoi eseguirlo con node)
   ===========================================================
*/
const pricesExample = [7, 1, 5, 3, 6, 4];

// Chiamata "silenziosa"
console.log("maxProfit (silent):", maxProfit(pricesExample)); // => 5

// Chiamata con verbose: stampa la tabella con gli stati giorno per giorno
console.log("\nmaxProfit (verbose):");
maxProfit(pricesExample, { verbose: true }); // stampa tabella + risultato

/* ===========================================================
   CONSIGLI RAPIDI (da fratello maggiore)
   ===========================================================
   - Disegna sempre l'array su carta e prova a segnare minSoFar e profitto potenziale.
   - Se ti perdono nelle iterazioni, prova a eseguire a mano 2-3 giorni e scrivili in tabella.
   - Capire questa tecnica (tenere uno stato "minimo/massimo parziale") è utile in
     molti problemi di stream/online algorithms.
   - La soluzione è O(n): ricordala a memoria per l'esame.
*/
