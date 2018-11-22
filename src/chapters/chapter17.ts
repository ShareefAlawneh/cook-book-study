import * as fs from 'fs';
import * as path from 'path';


let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

function frequncesImb(wordList) {
    let wordFreqs = {};
    for (let word of wordList) {
        if (word in wordFreqs) {
            wordFreqs[word] += 1;
        } else {
            wordFreqs[word] = 1;
        }
    }
    return wordFreqs;
}

function ectractWordsFromFile(fileName) {
    return fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/).filter(word => !stopWords.includes(word));
}

let extractWordsFunction = "(fileName) => ectractWordsFromFile(fileName)";
let frequencyFunction = "(wl) => frequncesImb(wl)";
let sortFunction = "(wordFreqs) => [...Object.entries(wordFreqs).sort((a, b) => b[1] - a[1])]";
let fileName = "fileToRead.txt";

eval(`this.extractWords = ${extractWordsFunction}`);
eval(`this.extractWords = ${extractWordsFunction}`);
eval(`this.frequencies =   ${frequencyFunction}`);
eval(`this.sort =   ${sortFunction}`);


let wordFrequency = this["sort"](this["frequencies"](this["extractWords"](fileName)));

for (let wf of wordFrequency) {
    console.log(wf[0], '-', wf[1]);
}