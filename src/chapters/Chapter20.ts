import * as fs from 'fs';
import * as path from 'path';

function extractWords(fileName) {

    let strData = '';
    if (typeof fileName != 'string' || !fileName) {
        return [];
    }
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
    if (!(wordsList instanceof Array) || !wordsList.length) {
        return [];
    }

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
    if (!(wordsList instanceof Array) || !wordsList.length) {
        return {};
    }

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
    if (typeof wordFreqs != 'object' || wordFreqs == {}) {
        return [];
    }
    return [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
}


export function run() {
    let fileName = 'fileToRead.txt';
    let wordFreqs = sort(frequencies(removeStopWords(extractWords(fileName))));
    wordFreqs.forEach(wf => console.log(`${wf[0]} - ${wf[1]}`));
}