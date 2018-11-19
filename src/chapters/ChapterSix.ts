import * as fs from 'fs';
import * as path from 'path';

export function run() {

    let counts = {};
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    let words = fs.readFileSync(path.join(__dirname, `../utils/fileToRead.txt`), 'utf-8').split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);

    words.filter(w => !stopWords.includes(w))
        .forEach(w => counts[w] ? counts[w] += 1 : counts[w] = 1)
    let wordFreqs = [...Object.entries(counts).sort((a: any, b: any) => b[1] - a[1])];
    for (let wf of [...wordFreqs.slice(0, 25)]) console.log(wf[0], '-', wf[1]);
}
