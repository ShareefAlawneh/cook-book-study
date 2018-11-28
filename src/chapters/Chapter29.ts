import * as fs from 'fs';
import * as path from 'path';


let wordSpace = [];
let freqSpace = [];

let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");

function proccessWords() {
    let wordFreqs = {};
    while (true) {
        let word = wordSpace.pop();
        if (word == undefined)
            break;

        if (!stopWords.includes(word)) {
            if (word in wordFreqs) {
                wordFreqs[word] += 1;
            } else {
                wordFreqs[word] = 1;
            }
        }
    }
    freqSpace.unshift(...[...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])]);
}

let fileName = 'fileToRead.txt';
for (let word of fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
    .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/)) {
    wordSpace.unshift(word);
}

let workers = [];

for (let i = 0; i < 5; i++) {
    workers.push(proccessWords);
}

for (let worker of workers) {
    worker();
}

while (freqSpace.length) {
    let wf = freqSpace.shift();
    console.log(wf[0], '-', wf[1]);
}