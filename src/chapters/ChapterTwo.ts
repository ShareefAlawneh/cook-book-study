import * as  fs from 'fs';
import * as path from 'path';
import { Stack } from '../dataStructure/Stack';

let stack = new Stack<any>();

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
    stack.top().push(...Array.from('abcdefghijklmnopqrstuvwxyz'));

    heap["stopWords"] = stack.pop();
    heap["words"] = [];
    while (!stack.isEmpty()) {
        if (heap["stopWords"].indexOf(stack.top()) > -1) {
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
    while (!stack.isEmpty()) {
        for (heap["word"] of Object.keys(heap["wordFreqs"])) {
            if (stack.top() == heap["word"]) {
                heap["exists"] = true;
                break;
            }
        }

        if (heap["exists"]) {
            stack.push(heap["wordFreqs"][stack.top()]);
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
    delete heap["exists"];
    delete heap["word"];


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

    while (stack.top() < 25 && stack.size() > 1) {
        heap["i"] = stack.pop();
        let [w, f] = stack.pop();
        console.log(`${w} - ${f}`);
        stack.push(heap["i"]);
        stack.push(1);
        stack.push(stack.pop() + stack.pop());
    }
}

