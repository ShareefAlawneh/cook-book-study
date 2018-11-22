import * as fs from 'fs';
import * as path from 'path';

function printInfo(fun: Function, args: IArguments) {
    console.log(`my name is ${fun.name} and my locals is ${JSON.stringify(args)}`);

    // can not call fun.caller.name in strict mode
}

function readStopWords() {

    // I Can't Say This In Strict Mode

    // if (readStopWords.caller.name !== 'extractWords') {
    //     return null;
    // }
    printInfo(readStopWords, arguments);
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

    return stopWords;
}

function extractWords(fileName: string) {
    printInfo(extractWords, arguments);
    let data = fs.readFileSync(path.join(__dirname, `../utils/${arguments["0"]}`), 'utf-8').split("").join("")
        .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);

    let stopWords = readStopWords()

    return data.filter(word => !stopWords.includes(word));
}

function frequencies(wordsList) {
    printInfo(frequencies, arguments);
    let wordFreqs = {};

    for (let word of arguments["0"]) {
        if (word in wordFreqs) {
            wordFreqs[word] += 1;
        } else {
            wordFreqs[word] = 1;
        }
    }

    return wordFreqs;
}

function sort(wordFreqs) {
    printInfo(sort, arguments);
    return [...Object.entries(arguments["0"]).sort((a: any, b: any) => b[1] - a[1])];
}

function main() {
    printInfo(main, arguments);
    let wordFreqs = sort(frequencies(extractWords("fileToRead.txt")));
    console.log("//---------------//");
    for (let wf of wordFreqs) {
        console.log(wf[0], '-', wf[1]);
    }
}


export function run() {
    main();
}

