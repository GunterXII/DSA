function twoSum(arr, target) {
  // Scorriamo tutti gli indici possibili i
  for (let i = 0; i < arr.length; i++) {
    // Per evitare di ripetere coppie o usare lo stesso elemento due volte
    // facciamo partire j da i+1
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j]; // ritorna le posizioni degli elementi
      }
    }
  }
  return -1; // se nessuna coppia trovata
}

console.log(twoSum([2, 7, 11, 15], 19)); // [2,3] perché 11+8=19
