import * as fs from 'fs';
import * as path from 'path';

function acceptTypes(type) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let method = descriptor.value;
        descriptor.value = function () {
            for (let arg in arguments) {
                if (typeof arguments[arg] != type) {
                    throw Error(`Expecting Type ${type} but got ${typeof arg}`);
                }
            }
            return method.apply(this, arguments);
        }
        return descriptor;
    }
}


class WordFrequencyController {
    @acceptTypes("string")
    extractWords(fileName) {
        let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

        let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);

        return data.filter(word => !stopWords.includes(word));
    }

    @acceptTypes("object")
    frequencies(wordList) {
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

    @acceptTypes("object")
    sort(wordFreqs) {
        return [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
    }

}

export function run() {
    let wfc = new WordFrequencyController();

    let wordFreqs = wfc.sort(wfc.frequencies(wfc.extractWords('fileToRead.txt')));

    wordFreqs.forEach(wf => console.log(wf[0], '-', wf[1]));
}