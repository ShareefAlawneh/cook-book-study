import * as fs from 'fs';
import * as path from 'path';


function extractWords(fileName: string) {
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

    let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/).filter(word => !stopWords.includes(word));

    return data.filter(word => !stopWords.includes(word));
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

function profile(f) {

    let profileWrapper = function (...args) {
        let t1 = performance.now();
        let retValue = f(...args);
        let elapsed = performance.now() - t1;

        console.log(`${f.name} took ${elapsed} seconds`);
        return retValue;
    }

    return profileWrapper;
}




export function run() {
    let trackedFunctions = [extractWords, frequencies, sort];
    for (let f of trackedFunctions) {
        this[f.name] = profile(f);
    }
    let wordFreqs = sort(frequencies(extractWords("fileToRead.txt")));
    for (let wf of wordFreqs) {
        console.log(wf[0], '-', wf[1]);
    }
}
