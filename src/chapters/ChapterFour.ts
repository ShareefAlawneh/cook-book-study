import * as fs from 'fs';
import * as path from 'path';

let data: any[] = [];
let words = [];
let wordFreqs = [];


function readFile(fileName: string) {

    data.concat(fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8'));
}

function filterCharsAndNormalize() {
    for (let i of Array.from(Array(data.length).keys())) {
        if (data[i].match(/[a-z0-9]/i) != null) {
            data[i] = ' ';
        } else {
            data[i] = data[i].toLowerCase();
        }
    }
}

function scan() {
    let dataStr = '' + data.join();
    words.concat(dataStr.split(/s+/));
}

function removeStopWords() {

    let stopWords = [...fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8').split(',')];
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    let indexes = [];
    for (let i of Array.from(Array(words.length).keys())) {
        if (stopWords.includes(words[i])) {
            indexes.push(i);
        }
    }
    for (let i of Array.from(Array(indexes.length).keys()).reverse()) {
        words.splice(i, 1);
    }
}

function frequencies() {
    for (let w of words) {
        let keys = wordFreqs.map(wd => wd[0]);
        if (w in keys) {
            wordFreqs[keys.indexOf(w)][1] += 1;

        }
        else {
            wordFreqs.push([w, 1]);
        }
    }
}

function sort() {
    console.log("asdas", wordFreqs);
    wordFreqs.push(...Object.entries(wordFreqs.pop()).sort((a: any, b: any) => a[1] - b[1]));
}

readFile("fileToRead.txt");
filterCharsAndNormalize();
scan();
removeStopWords();
sort();

for (let tf of [...wordFreqs.slice(0, 25)])
    console.log(`${tf[0]} - ${tf[1]}`);