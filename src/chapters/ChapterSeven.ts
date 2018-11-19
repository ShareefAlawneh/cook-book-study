import * as fs from 'fs';
import * as path from 'path';

function count(wordList: any[], stopWords: any[], wordFreqs = {}): any {

    if (wordList.length == 0) {
        return wordFreqs;
    }

    let word = wordList[0];
    if (!stopWords.includes(word)) {
        if (word in wordFreqs) {
            wordFreqs[word] += 1;
        } else {
            wordFreqs[word] = 1;
        }
    }

    return count([...wordList.slice(1, wordList.length - 1)], stopWords, wordFreqs);

}

function printAll(wordFreqs = {}) {
    for (let wf of [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1]).slice(0, 25)])
        console.log(wf[0], '-', wf[1]);

}

export function run() {
    let words = fs.readFileSync(path.join(__dirname, `../utils/fileToRead.txt`), 'utf-8').split("").join("").replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");

    printAll(count(words, stopWords));

}