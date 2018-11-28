import * as fs from 'fs';
import * as path from 'path';

class WordFreqsModel {
    freqs;
    stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");

    update(fileName: string) {
        try {
            let words = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('').replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);
            let filteredWords = words.filter(w => !this.stopWords.includes(w));
            let filteredUniquWords = filteredWords.filter((w, i, a) => a.indexOf(w) == i);
            this.freqs = filteredUniquWords.map(word => [word, filteredWords.filter(w => w == word).length])
        } catch (Error) {
            console.log("file Not Found");
            this.freqs = [];
        }
    }
}


class WordFrequencyView {
    private _model;
    constructor(model) {
        this._model = model;
    }

    render() {
        let sortedFreqs = this._model.freqs.sort((a: any, b: any) => b[1] - a[1]);
        for (let wf of sortedFreqs) {
            console.log(wf[0], '-', wf[1]);
        }
    }
}

class WordFreqsController {
    private _model;
    private _view;
    constructor(view, model) {
        this._model = model;
        this._view = view;
    }

    run(fileName) {
        this._model.update(fileName);
        this._view.render();
    }
}


export function run() {
    let model = new WordFreqsModel();
    let view = new WordFrequencyView(model);
    let controller = new WordFreqsController(view, model);
    controller.run('fileToRead.txt');
}
