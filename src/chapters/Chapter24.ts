import * as fs from 'fs';
import * as path from 'path';

class TFQuarantine {
    private _funcs;
    constructor(func) {
        this._funcs = [func];
    }

    bind(func) {
        this._funcs.push(func);
        return this;
    }

    execute() {
        function gaurdCallback(v) {
            return v instanceof Function ? v() : v;
        }
        let value;
        this._funcs.forEach(func => value = func(gaurdCallback(value)))
        console.log(gaurdCallback(value));
    }
}

function getInput() {
    function _f() {
        return 'fileToRead.txt';
    }
    return _f;
}

function getWordsFromFile(fileName) {
    function _f() {
        let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8');
        return data;
    }
    return _f;
}

function extractWords(fileData) {
    function _f() {
        let data = fileData.split('').join('')
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);

        return data;
    }
    return _f;
}
function getStopWords(wordList) {
    return [fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8'), wordList];
}

function removeStopWords(data) {
    function _f() {
        let stopWords = data[0].split(',');
        stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
        return data[1].filter(word => !stopWords.includes(word));
    }

    return _f;
}


function frequencies(wordList) {
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

function sort(wordFreqs) {
    return [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
}

function top25(wordFreqs) {
    let top25 = "";
    console.log(wordFreqs);
    for (let wf of wordFreqs) {
        console.log(`${wf[0]} - ${wf[1]}`)
    }
    // return top25;
}


export function run() {
    let tfq = new TFQuarantine(getInput)
        .bind(getWordsFromFile)
        .bind(extractWords)
        .bind(getStopWords)
        .bind(removeStopWords)
        .bind(frequencies)
        .bind(sort)
        .bind(top25)
        .execute();
}