// Funzione: isValidParenthesis
// Scopo: controllare se una stringa di parentesi è bilanciata.
// Accetta tre tipi di parentesi: (), [], {}
// Metodo: uso di un array come stack e di una mappa (object) per associare
// ogni parentesi di chiusura alla corrispondente parentesi di apertura.

function isValidParenthesis(str){
    // 1) controllo rapido: se la lunghezza è dispari non può essere bilanciata
    //    perché ogni parentesi aperta richiede una parentesi chiusa.
    if(str.length % 2 !== 0) return false

    // 2) 'stack' sarà il nostro contenitore LIFO (usiamo un array come stack)
    let stack=[]

    // 3) 'map' collega ogni parentesi di chiusura alla parentesi di apertura corretta.
    //    Esempio: map[')'] === '('
    //    Questo ci permette di controllare velocemente quale apertura ci si aspetta
    //    quando troviamo una parentesi di chiusura.
    const map = {
      ')': '(',
      ']': '[',
      '}': '{'
    }

    // 4) scorriamo la stringa carattere per carattere
    for(let parentese of str){

        // 4.a) controllo se il carattere è una parentesi di apertura.
        //      Object.values(map) restituisce ['(', '[', '{'] — le aperture.
        //      includes(parentese) ci dice se il carattere è tra le aperture.
        if (Object.values(map).includes(parentese)) {
            // è un'apertura: la inseriamo nello stack (push in cima)
            stack.push(parentese)
        }

        // 4.b) controllo se il carattere è una parentesi di chiusura.
        //      Object.keys(map) restituisce [')', ']', '}'] — le chiusure.
        if(Object.keys(map).includes(parentese)){

            // 4.b.i) caso: troviamo una chiusura ma lo stack è vuoto
            //          significa che non c'è nessuna apertura da chiudere → invalido
            if(stack.length==0){
                return false
            }

            // 4.b.ii) controlliamo se l'ultima apertura nello stack corrisponde
            //          a quella richiesta dalla chiusura corrente.
            //          map[parentese] restituisce la parentesi di apertura attesa.
            if(stack[stack.length-1]==map[parentese]){
                // è la corrispondenza giusta: togliamo l'apertura dallo stack
                stack.pop()
            }else {
                // la chiusura non corrisponde all'apertura in cima → invalido
                return false
            }
        }
    }

    // 5) se alla fine lo stack è vuoto tutte le aperture sono state chiuse correttamente
    return stack.length === 0

 }

/*
====================
NOTE IMPORTANTE SULL'USO DI 'map'
====================
- La mappa (object) è il cuore della funzione quando hai più tipi di parentesi.
  Ti permette di sapere "qual è l'apertura corretta" per ogni chiusura,
  senza dover scrivere una pila di if/else.

- Vantaggi della mappa:
  * lookup diretto: map[chiusura] restituisce immediatamente la parentesi corrispondente.
  * rende il codice più leggibile e facile da estendere (aggiungi un'altra coppia e funziona).

- Piccola ottimizzazione (non obbligatoria ma utile):
  * chiamare Object.keys(map).includes(...) e Object.values(map).includes(...)
    ad ogni iterazione è un po' inefficiente perché ricostruisce l'array ad ogni chiamata.
  * soluzione semplice: prima del ciclo crea due Set o due array una volta sola:
      const openings = new Set(Object.values(map))
      const closings = new Set(Object.keys(map))
    poi usa openings.has(parentese) e closings.has(parentese) (operazione O(1)).

- Alternativa più compatta alla logica "peek e poi pop":
  * quando incontri una chiusura puoi fare direttamente:
      if (stack.pop() !== map[parentese]) return false
    (attenzione: usa questo pattern solo se sai gestire il caso stack vuoto —
     stack.pop() su array vuoto restituisce undefined, quindi la condizione fallirà correttamente)

====================
SCALETTA (trace) — esempio passo-passo con la stringa: "{[()]}"
====================
Stringa: "{ [ ( ) ] }"
Inizialmente: stack = []

Iterazione 1: parentese = '{'
 - è un'apertura (openings include '{') → stack.push('{')
 - stack adesso: ['{']

Iterazione 2: parentese = '['
 - apertura → stack.push('[')
 - stack: ['{', '[']

Iterazione 3: parentese = '('
 - apertura → stack.push('(')
 - stack: ['{', '[', '(']

Iterazione 4: parentese = ')'
 - è una chiusura → controlliamo stack non vuoto (ok)
 - map[')'] === '(' → confrontiamo con cima stack: stack[stack.length-1] === '(' ? sì
 - quindi facciamo stack.pop()
 - stack dopo pop: ['{', '[']

Iterazione 5: parentese = ']'
 - chiusura → map[']'] === '['
 - confronto con cima stack: '[' === '[' → ok → pop
 - stack: ['{']

Iterazione 6: parentese = '}'
 - chiusura → map['}'] === '{'
 - confronto: '{' === '{' → ok → pop
 - stack: []

Fine del ciclo: stack.length === 0 → ritorniamo true (stringa bilanciata)

====================
Esempio che fallisce: "{(])}"
 - dopo aver processato '{' e '(' lo stack è ['{', '(']
 - arriva ']' → map[']'] === '[' ma cima stack è '(' → non corrispondono → return false

====================
PICCOLI SUGGERIMENTI PER STUDIARE
 - prova a tracciare la funzione su carta con esempi diversi finché non 
   vedi lo stack cambiare: è il miglior modo per fissare il comportamento.
 - prova anche casi limite: stringa vuota, singolo carattere, solo aperture, inizio con chiusura.
*/