import * as fs from 'fs';
import * as path from 'path';

let wordFreqs = [];
let stopWords = fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8').split(",");

stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
export function run() {
    fs.readFileSync(path.join(__dirname, '../utils/fileToRead.txt'), 'utf-8')
        .split('\r\n').forEach((line: string) => {
            line = line + ' ';
            let startChar = null;
            let i = 0;

            for (let c of line) {
                if (startChar == null) {
                    if (c.match(/[a-z0-9]/i) != null) {
                        startChar = i;
                        i += 1

                    }
                } else {
                    if (c.match(/[a-z0-9]/i) == null) {
                        let found = false;
                        let word = line.substring(startChar, i + 1).toLowerCase();

                        if (!wordFreqs.includes(word)) {
                            let pairIndex = 0;

                            for (let pair of wordFreqs) {
                                if (word == pair[0]) {
                                    pair[1] += 1;
                                    found = true;
                                    let foundAt = pairIndex;
                                    break;
                                }
                                pairIndex += 1;
                            }
                            if (!found) {
                                if (!stopWords.includes(word.trim()))
                                    wordFreqs.push([word, 1]);
                            }
                        }
                        startChar = null;
                    }
                    i += 1;
                }
            }
        });

    //linear sort, unfortunately i can't use quick sort in this style as i can't use the built in sort function in js :(
    for (let n of Array.from(Array(wordFreqs.length).keys())) {
        for (let j of Array.from(Array(wordFreqs.length).keys())) {
            if (wordFreqs[n][1] > wordFreqs[j][1]) {
                [wordFreqs[j], wordFreqs[n]] = [wordFreqs[n], wordFreqs[j]];
                break;
            }
        }
    }

    for (let tf of [...wordFreqs.slice(0, 25)]) {
        console.log(`${tf[0]} - ${tf[1]}`);
    }

}


