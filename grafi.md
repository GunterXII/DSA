🔹 Cos’è un grafo

Un grafo è una collezione di nodi (vertici) e archi (link) che collegano coppie di nodi.
Serve per rappresentare relazioni tra oggetti: strade tra città, connessioni social, rete internet, ecc.

Ogni nodo = un punto / oggetto

Ogni arco = una connessione (può avere direzione o peso)

🔹 Tipi di grafi

Non orientato: le connessioni vanno in entrambi i sensi (A ↔ B)

Orientato: gli archi hanno una direzione (A → B ≠ B → A)

Ponderato: ogni arco ha un “peso” (es. distanza, costo, tempo)

🔹 Modi per rappresentare un grafo
1️⃣ Matrice di adiacenza

È una tabella (matrice) NxN dove N = numero di nodi.

Riga = nodo di partenza

Colonna = nodo di arrivo

1 se esiste collegamento, 0 se non esiste

Esempio (grafo con A–B–C):

     A  B  C
A [ 0, 1, 1 ]
B [ 1, 0, 0 ]
C [ 1, 0, 0 ]


➡ A è collegato a B e C
➡ B e C collegati solo con A

✅ Vantaggi: facile capire se due nodi sono collegati
❌ Svantaggi: occupa molto spazio per grafi grandi e “sparsi”

2️⃣ Lista di adiacenza

Usa un oggetto (o mappa):
ogni chiave è un nodo, e il valore è un array con i nodi collegati.

Esempio:

{
  A: ["B", "C"],
  B: ["A"],
  C: ["A"]
}


➡ A è collegato a B e C
➡ B collegato solo ad A
➡ C collegato solo ad A