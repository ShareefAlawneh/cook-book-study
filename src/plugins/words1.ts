import * as fs from 'fs';
import * as path from 'path';

export function extractWords(fileName: string) {
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

    let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/).filter(word => !stopWords.includes(word));

    return data.filter(word => !stopWords.includes(word));

}