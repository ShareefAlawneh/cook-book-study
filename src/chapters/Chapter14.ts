import * as fs from 'fs';
import * as path from 'path';


class WordFrequencyFrameWork {

    private _loadEventHandlers: any[] = [];
    private _doWorkEventHandlers: any[] = [];
    private _endEventHandlers: any[] = [];


    registerForLoadEvent(handler) {
        this._loadEventHandlers.push(handler);
    }
    registerForDoWorkEvent(handler) {
        this._doWorkEventHandlers.push(handler);
    }
    registerForEndEvent(handler) {
        this._endEventHandlers.push(handler);
    }

    run(fileName: string) {
        for (let handler of this._loadEventHandlers) {
            handler(fileName);
        }
        for (let handler of this._doWorkEventHandlers) {
            handler();
        }
        for (let handler of this._endEventHandlers) {
            handler();
        }

    }
}

class DataStorage {
    private _data = "";
    private _stopWordsFilter = undefined;
    private _wordEventHandler = [];

    constructor(wfapp: WordFrequencyFrameWork, stopWordFilter: StopWordFilter) {
        this._stopWordsFilter = stopWordFilter;
        wfapp.registerForLoadEvent(this.load);
        wfapp.registerForDoWorkEvent(this.produceWords);
    }

    private load = (fileName: string) => {
        this._data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("")
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase();

    }

    private produceWords = () => {
        for (let word of this._data.split(/[\s,]+/)) {
            if (!this._stopWordsFilter.isStopWord(word)) {
                for (let handler of this._wordEventHandler) {
                    handler(word);
                }
            }
        }
    }

    registerForWordEvent(handler) {
        this._wordEventHandler.push(handler);
    }
}


class StopWordFilter {
    private _stopWords: any[];
    constructor(wfapp: WordFrequencyFrameWork) {
        wfapp.registerForLoadEvent(this.load);
        this._stopWords = [];
    }

    private load = () => {
        this._stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        this._stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    }

    isStopWord(word) {
        return this._stopWords.includes(word);
    }
}

class WordFrequencyCounter {
    private _wordFreqs = {};
    constructor(wfapp: WordFrequencyFrameWork, dataStorage: DataStorage) {
        dataStorage.registerForWordEvent(this.incrementCount);
        wfapp.registerForEndEvent(this.printFreqs);
    }

    private incrementCount = (word) => {
        if (word in this._wordFreqs) {
            this._wordFreqs[word] += 1;
        } else {
            this._wordFreqs[word] = 1;
        }
    }

    private printFreqs = () => {

        let wordFreqs = [...Object.entries(this._wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
        for (let wf of [...wordFreqs.slice(0, 25)]) {
            console.log(wf[0], '-', wf[1]);
        }
    }
}

class WordsWithACounter {
    private _nonStopWords: string[] = [];
    private _nonStopWordsDistincts: string[] = [];
    constructor(wfapp: WordFrequencyFrameWork, dataStorage: DataStorage) {
        dataStorage.registerForWordEvent(this.getWordsWithXLetter);
        wfapp.registerForEndEvent(this.printWithZ);
    }


    private getWordsWithXLetter = (word: string) => {
        if (word.includes('a')) {
            this._nonStopWords.push(word);
            if (!this._nonStopWordsDistincts.includes(word)) {
                this._nonStopWordsDistincts.push(word);
            }
        }

    }

    private printWithZ = () => {
        console.log(`${this._nonStopWords.length} word(s) has the letter a (in total),\n${this._nonStopWordsDistincts.length} word(s) has letter a (ditinct)`);
    }

}

export function run() {
    let wfapp = new WordFrequencyFrameWork();
    let stopWordFilter = new StopWordFilter(wfapp);
    let dataStorage = new DataStorage(wfapp, stopWordFilter);
    let wordFrequencyCounter = new WordFrequencyCounter(wfapp, dataStorage);
    let wordsWithA = new WordsWithACounter(wfapp, dataStorage);
    wfapp.run("fileToRead.txt");
}