import * as fs from 'fs';
import * as path from 'path';

// in es2015 let will be determined as var which will make the variable global on the context of `this` (global context)



function readFile(fileName: string, data: any[]) {
    data = [];
    data.push(...fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split(""));
}

function filterCharsAndNormalize(data: any[]) {
    for (let i of Array.from(Array(data.length).keys())) {
        if (data[i].match(/[a-z0-9]/i) == null) {
            data[i] = ' ';
        } else {
            data[i] = data[i].toLowerCase();
        }
    }

}

function scan(data: any[], words: any[]) {
    words = [];
    let dataStr = data.join("");
    words.push(...dataStr.split(/[\s,]+/));
}

function removeStopWords(words: any[]) {

    let stopWords = [...fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8').split(',')];
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    let indexes = [];
    for (let i of Array.from(Array(words.length).keys())) {
        if (stopWords.includes(words[i])) {
            indexes.push(i);
        }
    }

    for (let i of indexes.reverse()) {
        words.splice(i, 1);
    }
}

function frequencies(words: any[], wordFreqs: any[]) {
    wordFreqs = [];
    for (let w of words) {
        let keys = wordFreqs.map(wd => wd[0]);
        if (keys.includes(w)) {
            wordFreqs[keys.indexOf(w)][1] += 1;
        }
        else {
            wordFreqs.push([w, 1]);
        }
    }


}

function sort(wordFreqs: any[]) {
    for (let i in wordFreqs) {
        for (let j in wordFreqs) {
            if (wordFreqs[i][1] > wordFreqs[j][1]) {
                [wordFreqs[i], wordFreqs[j]] = [wordFreqs[j], wordFreqs[i]];
                break;
            }
        }
    }
}

export function run() {
    let data = [];
    let words = [];
    let wordFreqs = [];
    readFile("fileToRead.txt", data);
    filterCharsAndNormalize(data);
    scan(data, words);
    removeStopWords(words);
    frequencies(words, wordFreqs);
    sort(wordFreqs);

    for (let tf of [...wordFreqs.slice(0, 25)])
        console.log(`${tf[0]} - ${tf[1]}`);
}