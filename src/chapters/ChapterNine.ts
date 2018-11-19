import * as fs from 'fs';
import * as path from 'path';

class TFTheOne {
    private _value;
    constructor(v) {
        this._value = v;
    }

    bind(this, callback) {
        this._value = callback(this._value);
        return this;
    }

    printMe() {
        console.log(this._value);
    }
}


function readFile(fileName) {
    return fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("");
}

function filterChars(data: string) {
    return data.replace(new RegExp('[^a-zA-Z0-9]+'), ' ');
}

function normalize(data: string) {
    return data.toLowerCase();
}

function scan(data: string) {
    return data.split(/[\s,]+/);
}

function removeStopWords(data: string[]) {
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    return data.filter(w => !stopWords.includes(w));
}

function frequencies(data) {
    let wf = {};
    for (let w of data) {
        if (w in wf)
            wf[w] += 1;
        else
            wf[w] = 1;
    }
    return wf;

}


function sort(wf) {
    return [...Object.entries(wf).sort((a: any, b: any) => b[1] - a[1])];
}

function top25Words(wordFreqs: []) {
    let top25 = "";
    for (let wf of wordFreqs) {
        top25 += `${wf[0]} - ${wf[1]}\n`
    }
    return top25;
}


export function run() {

    new TFTheOne("fileToRead.txt")
        .bind(readFile)
        .bind(filterChars)
        .bind(normalize)
        .bind(scan)
        .bind(removeStopWords)
        .bind(frequencies)
        .bind(sort)
        .bind(top25Words)
        .printMe();
}