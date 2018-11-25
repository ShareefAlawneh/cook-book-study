export function top25(wordList) {
    let wordFreqs = {};
    for (let word of wordList) {
        if (word in wordFreqs) {
            wordFreqs[word] += 1;
        } else {
            wordFreqs[word] = 1;
        }
    }
    return [...[...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])].slice(0, 25)];
}