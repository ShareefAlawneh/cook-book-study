import * as fs from 'fs';
import * as path from 'path';
import * as readLine from 'readline';
let wordFreqs = [];
let stopWords = fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8').split(",");

stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
export function run() {
    readLine.createInterface(fs.createReadStream(path.join(__dirname, '../utils/fileToRead.txt')))
        .on('line', (line: string) => {
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
                            else if (wordFreqs.length > 1) {
                                for (let n in Array.from(Array(pairIndex).keys()).reverse()) {
                                    if (wordFreqs[pairIndex][1] > wordFreqs[n][1]) {
                                        [wordFreqs[n], wordFreqs[pairIndex]] = [wordFreqs[pairIndex], wordFreqs[n]];
                                    }
                                }
                            }
                        }
                        startChar = null;
                    }
                    i += 1;
                }
            }
        }).on('close', () => {

            for (let tf of [...wordFreqs.slice(0, 25)]) {
                console.log(`${tf[0]} - ${tf[1]}`);
            }
        });
}


