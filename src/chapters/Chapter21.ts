import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';


function extractWords(fileName) {

    assert(typeof fileName == 'string', 'I Need String As File Path');
    assert(fileName, 'I Need A Non-Empty File Path');
    let strData = "";
    try {
        strData = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8');
    } catch (Error) {
        console.log(`I/O Error ${Error} when Open ${fileName}`);
        return [];
    }

    return strData.split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
}

function removeStopWords(wordsList) {
    assert(wordsList instanceof Array, 'I Need Array');

    let stopWords;

    try {
        stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");

    } catch (Error) {
        console.log(`I/O Error ${Error} when Open stop_words.txt`);
        return wordsList;
    }

    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    return wordsList.filter(w => !stopWords.includes(w));
}

function frequencies(wordsList) {
    assert(wordsList instanceof Array, 'I Need Array');
    assert(wordsList.length, 'I Need A Non-Empty Array');
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
    assert(typeof wordFreqs == 'object', 'I Need Object');
    assert(wordFreqs != {}, 'I Need Non-Empty Object');

    try {
        return [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
    } catch (Error) {
        console.log(`Sorting Error`);
        throw Error;
    }

}



export function run() {
    let fileName = 'fileToRead.txt';
    try {
        let wordFreqs = sort(frequencies(removeStopWords(extractWords(fileName))));
        assert(wordFreqs instanceof Array, 'THIS IS NOT A LIST !!!!');
        assert(wordFreqs.length > 25, 'LESS THATN 25 :(');
        for (let [w, f] of wordFreqs.slice(0, 25)) {
            console.log(w, '-', f);
        }

    } catch (Error) {

        console.log('Something Went wrong', Error);

    }
}