import * as fs from 'fs';
import * as path from 'path';

let wordFreqs = []; // N#1
let stopWords = fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8').split(","); // N#2

stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz")); // N#3
export function run() {
    fs.readFileSync(path.join(__dirname, '../utils/fileToRead.txt'), 'utf-8') // N#4
        .split('\r\n').forEach((line: string) => {  // P#1 P#2
            line = line + ' '; // N#5
            let startChar = null; // N#6
            let i = 0; // N#7

            for (let c of line) { //N#8 P#3 P#4
                if (startChar == null) { // N#9 P#5 P#6
                    if (c.match(/[a-z0-9]/i) != null) { // N#10 P#7 P#8
                        startChar = i; // N#11 
                        i += 1 // N#12

                    }
                } else { // N#13
                    if (c.match(/[a-z0-9]/i) == null) { //N#14 P#9 P#10
                        let found = false; // N#15
                        let word = line.substring(startChar, i + 1).toLowerCase(); // N#16

                        if (!wordFreqs.includes(word)) { // N#17 P#11 P#12
                            let pairIndex = 0; // N#18

                            for (let pair of wordFreqs) { // N#19 P#13 P#14
                                if (word == pair[0]) { // N#20 P#15 P#16
                                    pair[1] += 1; // N#21
                                    found = true; // N#22
                                    let foundAt = pairIndex; // N#23
                                    break;
                                }
                                pairIndex += 1; // N#24
                            }
                            if (!found) { // N#25 P#17 P#18
                                if (!stopWords.includes(word.trim())) // N#26 P#19 P#20
                                    wordFreqs.push([word, 1]);// N#27
                            }
                        }
                        startChar = null; // N#28
                    }
                    i += 1; // N#29
                }
            }
        });

    //linear sort, unfortunately i can't use quick sort in this style as i can't use the built in sort function in js :(
    for (let n of Array.from(Array(wordFreqs.length).keys())) { // N#30 P#21 P#22
        for (let j of Array.from(Array(wordFreqs.length).keys())) { // N#31 P#23 P#24
            if (wordFreqs[n][1] > wordFreqs[j][1]) { // N#32 P#25 P#26
                [wordFreqs[j], wordFreqs[n]] = [wordFreqs[n], wordFreqs[j]]; // N#33
                break;
            }
        }
    }

    for (let tf of [...wordFreqs.slice(0, 25)]) { // N#34 P#27 P#28
        console.log(`${tf[0]} - ${tf[1]}`); // N#35
    }

}


