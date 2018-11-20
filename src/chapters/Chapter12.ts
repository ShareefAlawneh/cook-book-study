import * as fs from 'fs';
import * as path from 'path';

function extractWords(object: {}, fileName: string) {
    object["data"] = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("")
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
}

function loadStopWords(object: {}) {
    object["stopWords"] = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    object["stopWords"].push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
}

function incrementCount(object: {}, word: string) {
    object["freqs"][word] = word in object["freqs"] ? object["freqs"][word] + 1 : 1;
}

let dataStorageObj = {
    "data": [],
    "init": (fileName: string) => extractWords(dataStorageObj, fileName),
    "words": () => dataStorageObj["data"],
}

let stopWordsObj = {
    "stopWords": [],
    "init": () => loadStopWords(stopWordsObj),
    "isStopWord": (word: string) => stopWordsObj["stopWords"].includes(word)
}

let wordsFreqObj = {
    "freqs": {},
    "incrementCount": (word: string) => incrementCount(wordsFreqObj, word),
    "sorted": () => [...Object.entries(wordsFreqObj["freqs"]).sort((a: any, b: any) => b[1] - a[1])]
}

export function run() {
    dataStorageObj["init"]("fileToRead.txt");
    stopWordsObj["init"]();

    for (let w of dataStorageObj["words"]()) {

        if (!stopWordsObj["isStopWord"](w)) {
            wordsFreqObj["incrementCount"](w);
        }

    }
    let wordFreqs = wordsFreqObj["sorted"]();
    for (let wf of [...wordFreqs.slice(0, 25)]) {
        console.log(`${wf[0]} - ${wf[1]}`);
    }
}
