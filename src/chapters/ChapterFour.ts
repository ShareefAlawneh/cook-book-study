import * as fs from 'fs';
import * as path from 'path';

// in es2015 let will be determined as var which will make the variable global on the context of `this` (global context)
export default (function () {

    let data = [];
    let words = [];
    let wordFreqs = [];


    function readFile(fileName: string) {
        data.push(...fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split(""));
    }

    function filterCharsAndNormalize() {
        for (let i of Array.from(Array(data.length).keys())) {
            if (data[i].match(/[a-z0-9]/i) == null) {
                data[i] = ' ';
            } else {
                data[i] = data[i].toLowerCase();
            }
        }

    }

    function scan() {
        let dataStr = data.join("");
        words.push(...dataStr.split(/[\s,]+/));
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

        for (let i of indexes.reverse()) {
            words.splice(i, 1);
        }
    }

    function frequencies() {
        for (let w of words) {
            let keys = wordFreqs.map(wd => wd[0]);
            if (keys.includes(w)) {
                wordFreqs[keys.indexOf(w)][1] += 1;
            }
            else {
                wordFreqs.push([w, 1]);
            }
        }


    }

    function sort() {
        for (let i in wordFreqs) {
            for (let j in wordFreqs) {
                if (wordFreqs[i][1] > wordFreqs[j][1]) {
                    [wordFreqs[i], wordFreqs[j]] = [wordFreqs[j], wordFreqs[i]];
                    break;
                }
            }
        }
    }


    readFile("fileToRead.txt");
    filterCharsAndNormalize();
    scan();
    removeStopWords();
    frequencies();
    sort();

    for (let tf of [...wordFreqs.slice(0, 25)])
        console.log(`${tf[0]} - ${tf[1]}`);

})();