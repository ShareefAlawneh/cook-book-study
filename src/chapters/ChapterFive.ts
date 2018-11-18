import * as fs from 'fs';
import * as path from 'path';


function readFile(fileName: string) {
    return [...fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("")].join("");
}

function filterCharsAndNormalize(data: string) {
    data.replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase();
    return data;
}

function scan(data: string) {
    return data.split(/[\s,]+/);
}

function removeStopWords(words: any[]) {
    let stopWords = [...fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8').split(',')];
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    return words.filter((w) => !stopWords.includes(w));
}

function frequencies(words: any[]) {
    let wordFreqs = {};

    for (let w of words) {

        if (w in wordFreqs)
            wordFreqs[w] += 1;
        else
            wordFreqs[w] = 1;
    }
    return wordFreqs;
}

function sort(wordFreqs: {}) {
    return Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1]);

}

function printAll(wordFreqs: [string, {}][]) {
    for (let item of wordFreqs)
        console.log(`${item[0]} - ${item[1]}`);
}

export function run() {
    printAll(sort(frequencies(removeStopWords(scan(filterCharsAndNormalize(readFile("fileToRead.txt")))))))
}