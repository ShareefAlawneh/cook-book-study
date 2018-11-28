import * as fs from 'fs';
import * as path from 'path';


function* partionin(datatStr: string, nlines) {
    let lines = datatStr.split('\n');
    for (let i = 0; i < lines.length; i += nlines) {
        yield '\n' + lines.slice(i, i + nlines);
    }
}

function mapIterator(generator, mapper) {
    let retValue = [];
    for (let value of generator(readFile('fileToRead.txt'), 200))
        retValue.push(mapper(value));

    return retValue;
}



function splitWords(dataStr) {
    function _scan(strData) {
        return strData.replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
    }
    function _removeStopWords(wordList) {
        let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        return wordList.filter(w => !stopWords.includes(w));
    }
    let result = [];
    let words = _removeStopWords(_scan(dataStr));
    for (let w of words) {
        result.push(w);
    }
    return result;
}

function regroup(pairsList) {
    let mapping = {};
    for (let pairs of pairsList) {
        for (let p of pairs) {
            if (p in mapping) {
                mapping[p].push(p);
            } else {
                if (p)
                    mapping[p] = [p];
            }
        }
    }
    return mapping;
}

function countWords(mapping) {
    let mappingList: any[][] = [...Object.entries(mapping)];
    return mappingList.map(pairs => [pairs[0], pairs[1].length])
}

function readFile(fileName) {
    return fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('');
}

function sort(wordFreqs) {
    return wordFreqs.sort((a: any, b: any) => b[1] - a[1]);
}

export function run() {
    let splits = mapIterator(partionin, splitWords);
    let splitsPerWord = regroup(splits);
    let wordFreqs = sort(countWords(splitsPerWord));
    for (let wf of wordFreqs) {
        console.log(wf[0], '-', wf[1]);
    }

}