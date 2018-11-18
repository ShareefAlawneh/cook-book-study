import * as fs from 'fs';
import * as path from 'path';


function readFile(fileName: string) {
    let data = [];
    data.push(...fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split(""));
    return data;
}

function filterCharsAndNormalize(data: any[]) {
    for (let i of Array.from(Array(data.length).keys())) {
        if (data[i].match(/[a-z0-9]/i) == null) {
            data[i] = ' ';
        } else {
            data[i] = data[i].toLowerCase();
        }
    }

    return data;
}

function scan(data: any[]) {
    let words = [];
    let dataStr = data.join("");
    words.push(...dataStr.split(/[\s,]+/));
    return words;
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

    return words;
}

function frequencies(words: any[]) {
    let wordFreqs = [];
    for (let w of words) {
        let keys = wordFreqs.map(wd => wd[0]);
        if (keys.includes(w)) {
            wordFreqs[keys.indexOf(w)][1] += 1;
        }
        else {
            wordFreqs.push([w, 1]);
        }
    }

    return wordFreqs;


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
    return wordFreqs;
}

export function run() {
    for (let tf of [...sort(frequencies(removeStopWords(scan(filterCharsAndNormalize(readFile("fileToRead.txt")))))).slice(0, 25)])
        console.log(`${tf[0]} - ${tf[1]}`);
}
