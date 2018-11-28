import * as fs from 'fs';
import * as path from 'path';
import * as readLine from 'readline-sync';



let stops = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");

let data = {};

function errorState() {
    return ['something wrong', ['get', 'default', null]];
}

function defaultGetHandler() {
    let rep = "What Would you Like To Do?";
    rep += '\n1- Quit' + '\n2- Upload File';
    let links = { "1": ["post", "execution", null], "2": ['get', 'file_form', null] };
    return [rep, links];
}

function quitHandler() {
    console.log('GoodBye :)');
    process.exit(0);
}

function uploadGetHanlder() {
    return ['name of your file?', ['post', 'file']];
}

function uploadPostHandler(args) {
    function createData(fileName) {
        if (fileName in data) {
            return;
        }
        let wordFreqs = {};

        for (let word of fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('').replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/)) {
            if (!stops.includes(word)) {
                if (word in wordFreqs) {
                    wordFreqs[word] += 1;
                } else {
                    wordFreqs[word] = 1;
                }
            }
        }

        let sorted = [...Object.entries(wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
        data[fileName] = sorted;
        if (args == null) {
            return errorState();
        }

    }
    let fileName = args[0];

    try {
        createData(fileName);
    } catch (Error) {
        return errorState();
    }
    return getWordHanlder([fileName, 0]);
}


function getWordHanlder(args) {
    function getWord(fileName, wordIndex) {
        if (wordIndex > -1 && wordIndex < data[fileName].length) {
            return data[fileName][wordIndex];
        }
        return ['no more words', 0];
    }

    let fileName = args[0];
    let wordIndex = args[1];
    let wordInfo = getWord(fileName, wordIndex);
    let rep = `\n\x1b[32m#${wordIndex + 1}: ${wordInfo[0]} - ${wordInfo[1]}\x1b[0m`;
    rep += '\n\nWhat would you like do next?';
    rep += `\n1- Quit` + `\n2- Upload File`;
    rep += `\n3- See Next Most Frequency Occuring Word`
    rep += `\n4- See Prev Most Frequency Occuring Word`;
    let links = {
        "1": ['post', 'execution', null],
        "2": ['get', 'file_form', null],
        "3": ['get', 'word', [fileName, wordIndex + 1]],
        "4": ['get', 'word', [fileName, wordIndex - 1]]
    };
    return [rep, links];
}

let handlers = {
    'post_execution': quitHandler,
    'get_default': defaultGetHandler,
    'get_file_form': uploadGetHanlder,
    'post_file': uploadPostHandler,
    'get_word': getWordHanlder
};

function handleRequest(verb, uri, args) {
    function handlerKey(verb, uri) {
        return verb + '_' + uri;
    }
    if (handlerKey(verb, uri) in handlers) {
        return handlers[handlerKey(verb, uri)](args);
    }
    return handlers[handlerKey("get", "default")](args);
}

function renderAndGetInput(stateRepresentation, links) {
    console.log(stateRepresentation);
    if ((links instanceof Array) == true) {
        if (links[0] == 'post') {
            let input = readLine.question('> ');
            links.push([input]);
            return links;
        } else {
            return links;
        }
    } else if ((links instanceof Object) == true) {
        let input = readLine.question('> ');
        if (input in links) {

            return links[input];
        }
        else {
            return ['get', 'default', null];
        }
    } else {
        return ['get', 'default', null];
    }
}

let request = ['get', 'default', null];
export function run() {
    while (true) {
        let [stateRepresentation, links] = handleRequest(request[0], request[1], request[2]);
        request = renderAndGetInput(stateRepresentation, links);

    }
}




