import * as fs from 'fs';
import * as path from 'path';


function* charachters(fileName: string) {
    for (let line of fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('\n')) {
        line += ' ';
        for (let c of line) {
            yield c;
        }
    }
}

function* allWords(fileName: string) {
    let startChar = true;
    let word = "";
    for (let c of charachters(fileName)) {


        if (startChar == true) {

            if (c.match('[a-z0-9]')) {
                word = c.toLowerCase();
                startChar = false;
            }
            else {

            }
        }
        else {
            if (c.match('[a-z0-9]')) {
                word += c.toLowerCase();
            } else {
                startChar = true;
                yield word;

            }
        }
    }
}

function* nonStopWords(fileName) {
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

    for (let word of allWords(fileName)) {
        if (!stopWords.includes(word)) {
            yield word;
        }
    }
}

function* countAndSort(fileName: string) {
    let [freqs, i] = [{}, 1];

    for (let word of nonStopWords(fileName)) {
        if (word in freqs) {
            freqs[word] += 1;
        } else {
            freqs[word] = 1;
        }

        if (i % 5000 == 0)
            yield [...Object.entries(freqs).sort((a: any, b: any) => b[1] - a[1])];

        i++;
    }
    yield [...Object.entries(freqs).sort((a: any, b: any) => b[1] - a[1])];
}

export function run() {
    for (let wordFreqs of countAndSort('fileToRead.txt')) {
        console.log('--------------------------------');
        for (let [w, f] of wordFreqs)
            console.log(w, '-', f);
    }
}