import * as  fs from 'fs';
import * as path from 'path';

let stack = [];

let heap = {};

function readFile() {
    stack.push("fileToRead.txt");
    let fileContent = fs.readFileSync(path.join(__dirname, `../utils/${stack.pop()}`), 'utf-8');
    stack.push([fileContent]);

}

function filterChars() {
    heap["fileContent"] = stack.pop();
    stack.push(new RegExp('[^a-zA-Z0-9]+'));
    stack.push(heap["fileContent"]);
    stack.push([stack.pop()[0].replace(stack.pop(), ' ').toLowerCase()]);
    delete heap["fileContent"];
}


function scan() {
    stack.push(...stack.pop()[0].split(/[\s,]+/));
}

function removeStopWords() {
    let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8');
    stack.push(stopWords.split(','));
    stack[stack.length - 1].push(...Array.from('abcdefghijklmnopqrstuvwxyz'));

    heap["stopWords"] = stack.pop();
    heap["words"] = [];
    while (stack.length > 0) {
        if (heap["stopWords"].indexOf(stack[stack.length - 1]) > -1) {
            stack.pop();
        }
        else {
            heap["words"].push(stack.pop());
        }

    }

    stack.push(...heap["words"]);

    delete heap["words"];
    delete heap["stopWords"];

}

function frequencies() {

    heap["wordFreqs"] = {};
    heap["exists"] = false;
    heap["word"] = '';
    while (stack.length > 0) {
        for (heap["word"] of Object.keys(heap["wordFreqs"])) {
            if (stack[stack.length - 1] == heap["word"]) {
                heap["exists"] = true;
                break;
            }
        }

        if (heap["exists"]) {
            stack.push(heap["wordFreqs"][stack[stack.length - 1]]);
            stack.push(1);
            stack.push(stack.pop() + stack.pop());
            heap["exists"] = false;
        }
        else {
            stack.push(1);
        }
        heap["freq"] = stack.pop();
        heap["wordFreqs"][stack.pop()] = heap["freq"];
    }


    stack.push(heap["wordFreqs"]);
    delete heap["wordFreqs"];
    delete heap["ffreq"];


}


function sort() {
    stack.push(...Object.entries(stack.pop()).sort((a: any, b: any) => a[1] - b[1]));
}

export function run() {

    readFile();
    filterChars();
    scan();
    removeStopWords();
    frequencies();
    sort();

    stack.push(0);

    while (stack[stack.length - 1] < 25 && stack.length > 1) {
        heap["i"] = stack.pop();
        let [w, f] = stack.pop();
        console.log(`${w} - ${f}`);
        stack.push(heap["i"]);
        stack.push(1);
        stack.push(stack.pop() + stack.pop());
    }
}

