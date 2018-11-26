import * as fs from 'fs';
import * as path from 'path';


let allWords = [[], null];
let stopWords = [[], null];

let nonStopWords: any = [[], () => allWords[0].filter(w => !stopWords[0].includes(w))];
let uniques: any = [[], () => nonStopWords[0].filter((w, index, arr) => arr.indexOf(w) == index)];
let counts: any = [[], () => uniques[0].map(word => [word, nonStopWords[0].filter(w => w == word).length])];
let sortedData: any = [[], () => counts[0].sort((a: any, b: any) => b[1] - a[1])];

let allColumns = [allWords, stopWords, nonStopWords, uniques, counts, sortedData];

function update() {
    for (let c of allColumns) {
        if (c[1] !== null) {
            c[0] = c[1]();
        }
    }
}

export function run() {
    let fileName = 'fileToRead.txt';
    allWords[0] = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);

    stopWords[0] = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    update();
    for (let wf of sortedData[0].slice(0, 25)) {
        console.log(wf[0], '-', wf[1]);
    }
}