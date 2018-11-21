import * as fs from 'fs';
import * as path from 'path';

interface IDataStorage {
    words();
}

interface IStopWordFilter {
    isStopWord(word: string);
}

interface IWordFrequencyCounter {
    incrementCount(word: string);
    sorted();
}


class DataStorage implements IDataStorage {
    private _data: string[];
    constructor(fileName: string) {
        this._data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("")
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
    }
    words() {
        return this._data;
    }

    info() {

    }
}

class StopWordsFilter implements IStopWordFilter {
    private _stopWords: string[];
    constructor() {
        this._stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        this._stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    }
    isStopWord(word: string) {
        return this._stopWords.includes(word);
    }

}


class WordsFrequencyManager implements IWordFrequencyCounter {
    private _wordFreqs = {};
    incrementCount(word: string) {
        if (word in this._wordFreqs) {
            this._wordFreqs[word] += 1;
        } else {
            this._wordFreqs[word] = 1;
        }
    }
    sorted() {
        return [...Object.entries(this._wordFreqs).sort((a: any, b: any) => b[1] - a[1])]
    }
}


export class WordFrequencyController {
    private _dataStorage: IDataStorage;
    private _stopWordsFilter: IStopWordFilter;
    private _wordsFrequencyCounter: IWordFrequencyCounter;

    constructor() {
        this._dataStorage = new DataStorage("fileToRead.txt");
        this._stopWordsFilter = new StopWordsFilter();
        this._wordsFrequencyCounter = new WordsFrequencyManager();
    }

    run() {
        for (let word of this._dataStorage.words()) {
            if (!this._stopWordsFilter.isStopWord(word)) {
                this._wordsFrequencyCounter.incrementCount(word);
            }
        }

        let wordFreqs = this._wordsFrequencyCounter.sorted();

        for (let wf of [...wordFreqs.slice(0, 25)]) {
            console.log(wf[0], '-', wf[1]);
        }
    }



}
