import * as fs from 'fs';
import * as path from 'path';

class TFExcersise {

    constructor() {

    }
    info() {
        return this.constructor.name;
    }
}
class DataStorageManager extends TFExcersise {

    private _data: string;
    constructor(fileName: string) {
        super();
        this._data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("")
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ');
    }

    words() {
        return this._data.split(/[\s,]+/);
    }

    info() {
        return `${super.info()}: my data structer is  ${this._data.constructor.name}`;
    }
}

class StopWordsManager extends TFExcersise {
    private _stopWords: string[];
    constructor() {
        super();
        this._stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        this._stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    }

    isStopWord(word) {
        return this._stopWords.indexOf(word) > -1;
    }

    info() {
        return `${super.info()}: my data structer is  ${this._stopWords.constructor.name}`;
    }

}

class WordFrequencyManager extends TFExcersise {

    private _wordFreqs: {};
    constructor() {
        super();
        this._wordFreqs = {};
    }

    incrementCount(word) {
        if (word in this._wordFreqs) {
            this._wordFreqs[word] += 1;
        }
        else {
            this._wordFreqs[word] = 1;
        }
    }

    sorted() {
        return [...Object.entries(this._wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
    }

    info() {
        return `${super.info()}: my data structer is  ${this._wordFreqs.constructor.name}`;
    }
}


export class WordFrequencyController {
    private _storageManager: DataStorageManager;
    private _stopWordManager: StopWordsManager;
    private _wordFrequencyManager: WordFrequencyManager;
    constructor() {
        this._storageManager = new DataStorageManager("fileToRead.txt");
        this._stopWordManager = new StopWordsManager();
        this._wordFrequencyManager = new WordFrequencyManager();
    }

    run() {
        console.log(this._storageManager.info());
        console.log(this._stopWordManager.info());
        console.log(this._wordFrequencyManager.info());
        console.log("//-------------------------//");
        for (let w of this._storageManager.words()) {
            if (!this._stopWordManager.isStopWord(w)) {
                this._wordFrequencyManager.incrementCount(w);
            }
        }
        let wordFreqs = this._wordFrequencyManager.sorted();
        for (let wf of [...wordFreqs.slice(0, 25)]) {
            console.log(wf[0], '-', wf[1]);
        }
    }
}


