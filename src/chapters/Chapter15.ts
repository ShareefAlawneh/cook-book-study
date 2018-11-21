import * as fs from 'fs';
import * as path from 'path';


class EventManager {
    private _subscriptions: {};

    constructor() {
        this._subscriptions = {};
    }

    subscribe(eventType, handler) {
        if (eventType in this._subscriptions) {
            this._subscriptions[eventType].push(handler);
        } else {
            this._subscriptions[eventType] = [handler];
        }
    }

    unsubscripe(eventType, handler) {
        if (eventType in this._subscriptions) {
            this._subscriptions[eventType].splice(this._subscriptions[eventType].indexOf(handler), 1);
        }
    }

    publish(event) {
        let eventType = event[0];
        if (eventType in this._subscriptions) {
            for (let handler of this._subscriptions[eventType]) {
                handler(event);
            }
        }
    }
}


class DataStorage {
    private _data;
    private _eventManager: EventManager;
    constructor(eventManager: EventManager) {
        this._eventManager = eventManager;
        this._eventManager.subscribe('load', this.load);
        this._eventManager.subscribe('start', this.produceWords);
        this._eventManager.subscribe('distroy', this.distroy);
    }

    private load = (event) => {
        this._data = fs.readFileSync(path.join(__dirname, `../utils/${event[1]}`), 'utf-8').split("").join("")
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase();

    }

    private produceWords = () => {
        for (let word of this._data.split(/[\s,]+/)) {
            this._eventManager.publish(['word', word]);
        }

        this._eventManager.publish(['eof', null]);
    }

    private distroy = (event) => {

        console.log(`Destroy ${this.constructor.name}`)
        this._eventManager.unsubscripe('load', this.load);
        this._eventManager.unsubscripe('start', this.produceWords);

    }
}

class StopWordsFilter {
    private _stopWords: string[];
    private _eventManager: EventManager;
    constructor(eventManager: EventManager) {
        this._stopWords = [];
        this._eventManager = eventManager;
        this._eventManager.subscribe('load', this.load);
        this._eventManager.subscribe('word', this.isStopWord);
        this._eventManager.subscribe('distroy', this.distroy);
    }

    private load = () => {
        this._stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        this._stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));
    }

    private isStopWord = (event) => {
        let word = event[1];
        if (!this._stopWords.includes(word)) {
            this._eventManager.publish(['validWord', word]);
        }
    }


    private distroy = (event) => {

        console.log(`Destroy ${this.constructor.name}`)
        this._eventManager.unsubscripe('load', this.load);
        this._eventManager.unsubscripe('word', this.isStopWord);

    }



}

class WordFrequencyCounter {
    private _wordFreqs: {} = {};
    private _eventManager: EventManager;
    constructor(eventManager: EventManager) {
        this._eventManager = eventManager;
        this._eventManager.subscribe('validWord', this.incrementCount);
        this._eventManager.subscribe('print', this.printAll);
        this._eventManager.subscribe('distroy', this.distroy);
    }

    incrementCount = (event) => {
        let word = event[1];
        if (word in this._wordFreqs) {
            this._wordFreqs[word] += 1;
        } else {
            this._wordFreqs[word] = 1;
        }
    }

    printAll = (event) => {
        let wordFreqs = [...Object.entries(this._wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
        for (let wf of [...wordFreqs.slice(0, 25)]) {
            console.log(wf[0], '-', wf[1]);
        }
        console.log('//----------------------//');
    }

    private distroy = (event) => {

        console.log(`Destroy ${this.constructor.name}`)
        this._eventManager.unsubscripe('validWord', this.incrementCount);
        this._eventManager.unsubscripe('print', this.printAll);
    }

}

class WordWithLetterCounter {
    private _words: string[] = [];
    private _wordsDistinct: string[] = [];
    private _eventManager: EventManager;

    constructor(eventManager: EventManager) {
        this._eventManager = eventManager;
        this._eventManager.subscribe('validWord', this.incrementCount);
        this._eventManager.subscribe('print', this.printWords);
        this._eventManager.subscribe('distroy', this.distroy);
    }

    private incrementCount = (event) => {
        if (event[1].includes('a')) {
            this._words.push(event[1]);
            if (!this._wordsDistinct.includes(event[1])) {
                this._wordsDistinct.push(event[1]);
            }
        }

    }

    private printWords = (event) => {
        console.log(`${this._words.length} word(s) has the letter a (in total),\n${this._wordsDistinct.length} word(s) has letter a (ditinct)`);
        console.log('//----------------------//');
    }

    private distroy = (event) => {

        console.log(`Destroy ${this.constructor.name}`)
        this._eventManager.unsubscripe('validWord', this.incrementCount);
        this._eventManager.unsubscripe('print', this.printWords);

    }


}

class WordFrequencyApplication {
    private _eventManager: EventManager;
    constructor(eventManager: EventManager) {
        this._eventManager = eventManager;
        this._eventManager.subscribe('run', this.run);
        this._eventManager.subscribe('eof', this.stop);
    }

    private run = (event) => {
        this._eventManager.publish(['load', event[1]]);
        this._eventManager.publish(['start', null]);
    }

    private stop = () => {
        this._eventManager.publish(['print', null]);
        this._eventManager.publish(['distroy', null]);
    }
}


export function run() {
    let em = new EventManager();
    new DataStorage(em);
    new StopWordsFilter(em);
    new WordFrequencyCounter(em);
    new WordFrequencyApplication(em);
    new WordWithLetterCounter(em);
    em.publish(['run', 'fileToRead.txt']);
}