import * as fs from 'fs';
import * as path from 'path';


function readFile(fileName: string, callback: Function) {
    let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("");
    callback(data, normalize);
}

function filterChars(data: string, callback: Function) {
    data.replace(new RegExp('[^a-zA-Z0-9]+'), ' ');
    callback(data, scan);
}

function normalize(data: string, callback: Function) {
    callback(data.toLowerCase(), removeStopWords);
}

function scan(data: string, callback: Function) {
    callback(data.split(/[\s,]+/), frequencies);
}

function removeStopWords(data: string[], callBack: Function) {
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    callBack(data.filter(w => !stopWords.includes(w)), sort);
}

function frequencies(data: any[], callback: Function) {
    let wf = {};
    for (let w of data) {
        if (w in wf)
            wf[w] += 1;
        else
            wf[w] = 1;
    }
    callback(wf, printAll);
}

function sort(wf: {}, callback: Function) {
    callback([...Object.entries(wf).sort((a: any, b: any) => b[1] - a[1])], doNothing);
}

function printAll(wordFreqs: [], callback: Function) {
    for (let wf of wordFreqs)
        console.log(wf[0], '-', wf[1]);

    callback(undefined);
}

function doNothing(callback: Function) {
    return;
}
export function run() {
    readFile('fileToRead.txt', filterChars);
}
