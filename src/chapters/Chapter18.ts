import { performance } from 'perf_hooks';
import * as fs from 'fs';
import * as path from 'path';

class DecoratedProfile {

    @profile
    extractWords(fileName: string) {
        let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

        let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/).filter(word => !stopWords.includes(word));

        return data.filter(word => !stopWords.includes(word));
    }
    @profile
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


    @profile
    sort(wordFreqs) {
        return [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
    }



}


function profile(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    let method = descriptor.value;
    descriptor.value = function () {
        let t1 = performance.now();
        let retValue = method.apply(this, arguments);
        let elapsed = performance.now() - t1;
        console.log(`${target.name} took ${elapsed} seconds`);
        return retValue;
    }
    return descriptor;

}




export function run() {

    let decorated = new DecoratedProfile();
    let wordFreqs = decorated.sort(decorated.frequencies(decorated.extractWords("fileToRead.txt")));
    for (let wf of wordFreqs) {
        console.log(wf[0], '-', wf[1]);
    }
}