import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';

class THEErrorHandler {


    private _value;
    constructor(v) {
        this._value = v;
    }

    bind(this, callback) {
        try {

            this._value = callback(this._value);
        } catch (Error) {
            console.log('Something Went wrong', Error);
            process.exit();
        }
        return this;
    }

    printMe() {
        console.log(this._value);
    }

}
function extractWords(fileName) {

    assert(typeof fileName == 'string', 'I Need String As File Path, I Quit');
    assert(fileName, 'I Need A Non-Empty File Path, I Quit');

    let strData = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8');
    return strData.split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
}

function removeStopWords(wordsList) {
    assert(wordsList instanceof Array, 'I Need Array, I Quit');

    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    return wordsList.filter(w => !stopWords.includes(w));
}

function frequencies(wordsList) {
    assert(wordsList instanceof Array, 'I Need Array, I Quit');
    assert(wordsList.length, 'I Need A Non-Empty Array, I Quit');
    let wordFreqs = {};
    for (let word of wordsList) {
        if (word in wordFreqs) {
            wordFreqs[word] += 1;
        } else {
            wordFreqs[word] = 1;
        }
    }
    return wordFreqs;
}

function sort(wordFreqs) {
    assert(typeof wordFreqs == 'object', 'I Need Object, I Quit');
    assert(wordFreqs != {}, 'I Need Non-Empty Object, I Quit');
    // assert(false, 'JUST FOR TESTING :D')
    return [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];

}

function top25Words(wordFreqs: []) {
    let top25 = "";
    for (let wf of wordFreqs) {
        top25 += `${wf[0]} - ${wf[1]}\n`
    }
    return top25;
}

export function run() {
    let fileName = 'fileToRead.txt';
    new THEErrorHandler(fileName)
        .bind(extractWords)
        .bind(removeStopWords)
        .bind(frequencies)
        .bind(sort)
        .bind(top25Words)
        .printMe();
}