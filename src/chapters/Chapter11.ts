import * as fs from 'fs';
import * as path from 'path';


class Delegator {

    dispatch(message: string[]) {
        if (message[0] == 'info') {
            return this.info(message[1]);
        } else {
            throw (`Message Not UnderStod: ${message[0]}`);
        }
    }

    info(self) {
        return self.constructor.name;
    }
}

class DataStorageManager {

    private _data: string = "";

    dispatch(message: any[]) {
        if (message[0] == "init") {
            return this.init(message[1]);
        }
        else if (message[0] == "words") {
            return this.words();
        } else if (message[0] == 'info') {
            return `${message[1].dispatch(['info', this])}: my main data structure is ${this._data.constructor.name}`;
        } else {
            throw (`Message Not UnderStod: ${message[0]}`);
        }
    }

    private init(fileName: string): any {
        this._data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split("").join("")
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase();
    }

    private words() {
        return this._data.split(/[\s,]+/);
    }
}

class StopWordsManager {
    private _stopWords: string[] = [];

    dispatch(message: any[]) {
        if (message[0] == "init") {
            return this.init();
        } else if (message[0] == "isStopWord") {
            return this.isStopWord(message[1]);
        } else if (message[0] == 'info') {
            return `${message[1].dispatch(['info', this])}: my main data structure is ${this._stopWords.constructor.name}`;
        } else {
            throw (`Message Not UnderStod: ${message[0]}`);
        }
    }

    private init() {
        this._stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        this._stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    }

    private isStopWord = w => this._stopWords.includes(w);
}


class WordFrequencyManager {
    private _wordFreqs: {} = {};

    dispatch(message: any[]) {
        if (message[0] == "incrementCount") {
            return this.incrementCount(message[1]);
        } else if (message[0] == "sorted") {
            return this.sorted();
        } else if (message[0] == 'info') {
            return `${message[1].dispatch(['info', this])}: my main data structure is ${this._wordFreqs.constructor.name}`;
        } else {
            throw (`Message Not UnderStod: ${message[0]}`);
        }
    }

    private incrementCount(word): any {
        if (word in this._wordFreqs) {
            this._wordFreqs[word] += 1;
        }
        else {
            this._wordFreqs[word] = 1;
        }
    }

    private sorted() {
        return [...Object.entries(this._wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
    }
}

export class WordFrequencyController {

    private _storageMangae: DataStorageManager;
    private _stopWordsManager: StopWordsManager;
    private _wordsFrequencyManager: WordFrequencyManager;

    private _deligator: Delegator;


    dispatch(message: string[]) {
        if (message[0] == "init") {
            return this.init(message[1]);
        } else if (message[0] == "run") {
            return this.run();
        } else {
            throw (`Message Not UnderStod: ${message[0]}`);
        }
    }

    private init(fileName: string) {

        this._storageMangae = new DataStorageManager();
        this._stopWordsManager = new StopWordsManager();
        this._wordsFrequencyManager = new WordFrequencyManager();
        this._deligator = new Delegator();

        console.log(this._storageMangae.dispatch(['info', this._deligator]));
        console.log(this._stopWordsManager.dispatch(['info', this._deligator]));
        console.log(this._wordsFrequencyManager.dispatch(['info', this._deligator]));

        console.log("//-----------------------------//");

        this._storageMangae.dispatch(['init', fileName]);
        this._stopWordsManager.dispatch(['init']);
    }

    private run() {

        for (let w of this._storageMangae.dispatch(['words'])) {
            if (!this._stopWordsManager.dispatch(['isStopWord', w])) {
                this._wordsFrequencyManager.dispatch(['incrementCount', w]);
            }
        }

        let wordFreqs = this._wordsFrequencyManager.dispatch(['sorted']);

        wordFreqs.forEach(wf => {
            console.log(wf[0], '-', wf[1]);
        });

    }
}