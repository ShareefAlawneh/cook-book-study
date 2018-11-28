import * as fs from 'fs';
import * as path from 'path';


class ActiveWFObject {
    queue: any[];
    _stop;
    constructor() {
        this.queue = [];
        this._stop = false;
    }

    async run() {
        while (!this._stop) {
            let message = this.queue.shift();
            if (message != undefined)
                this["dispatch"](message);
            if (message != undefined && message[0] == 'die') {
                this._stop = true;
            }
            await setTimeout(() => { }, 300);
        }
    }
}

function send(reciver: ActiveWFObject, message) {
    reciver.queue.unshift(message);
    reciver._stop = false;

}
class DataStorageManager extends ActiveWFObject {
    private _data = "";
    private _stopWordManager;

    private dispatch(message) {

        if (message != undefined && message[0] == 'init') {
            this.init(message.splice(1, message.length - 1))
        } else if (message != undefined && message[0] == 'send_word_freqs') {
            this.processWords(message.splice(1, message.length - 1));
        } else {
            send(this._stopWordManager, message);
        }
    }

    private init(message) {
        let fileName = message[0];
        this._stopWordManager = message[1];
        this._data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase()
    }
    private async processWords(message) {
        let recipient = message[0];
        let words = this._data.split(/[\s,]+/);
        for (let w of words) {
            send(this._stopWordManager, ['filter', w]);
            await setTimeout(() => { }, 300);
        }
        send(this._stopWordManager, ['top25', recipient]);

    }

}

class StopWordsManager extends ActiveWFObject {
    private _stopWords = [];
    private _wordFreqsManager;
    private dispatch(message) {
        if (message != undefined && message[0] == 'init') {
            this.init(message.splice(1, message.length - 1))
        } else if (message != undefined && message[0] == 'filter') {
            return this.filter(message.splice(1, message.length - 1));
        } else {
            send(this._wordFreqsManager, message);
        }
    }

    private init(message) {
        this._wordFreqsManager = message[0];
        this._stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
    }
    private filter(message) {
        let word = message[0];
        if (!this._stopWords.includes(word)) {
            send(this._wordFreqsManager, ['word', word]);
        }

    }

}

class WordFreqsManager extends ActiveWFObject {
    private _wordFreqs = {};

    private dispatch(message) {
        if (message != undefined && message[0] == 'word') {
            this.incrementCount(message.splice(1, message.length - 1))
        } else if (message != undefined && message[0] == 'top25') {
            return this.top25(message.splice(1, message.length - 1));
        }
    }

    private incrementCount(message) {
        let word = message[0];
        if (word in this._wordFreqs) {
            this._wordFreqs[word] += 1;
        } else {
            this._wordFreqs[word] = 1;
        }
    }
    private top25(message) {
        let recipient = message[0];
        let freqSorted = [...Object.entries(this._wordFreqs).sort((a: any, b: any) => b[1] - a[1])];
        send(recipient, ['top25', freqSorted]);
    }



}


class WordFrequencyController extends ActiveWFObject {
    private _storageManager;
    private dispatch(message) {
        if (message != undefined && message[0] == 'run') {
            this.init(message.splice(1, message.length - 1))
        } else if (message != undefined && message[0] == 'top25') {
            return this.display(message.splice(1, message.length - 1));
        } else {
            throw Error("Message Not Understood: " + message);
        }
    }

    private init(message) {
        this._storageManager = message[0];
        send(this._storageManager, ['send_word_freqs', this]);
    }
    private display(message) {
        let wordFreqs = message[0];
        for (let wf of wordFreqs) {
            console.log(wf[0], '-', wf[1]);
        }
        send(this._storageManager, ['die']);
        this._stop = true;
    }


}


export function run() {
    let wfm = new WordFreqsManager();
    let swm = new StopWordsManager();

    send(swm, ['init', wfm]);



    let stm = new DataStorageManager();
    send(stm, ['init', 'fileToRead.txt', swm]);

    let wfc = new WordFrequencyController();

    send(wfc, ['run', stm]);

    // wfm.run();
    // swm.run();
    // stm.run();
    // wfc.run();


    for (let t of [wfm, swm, stm, wfc]) {
        t.run()
    }




}