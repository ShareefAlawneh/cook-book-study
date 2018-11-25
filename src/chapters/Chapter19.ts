import * as fs from 'fs';
import * as ini from 'ini';
import * as path from 'path';

let tffreqs, tfwords;
function loadPlugins() {
    let config = ini.parse(fs.readFileSync(path.join(__dirname, '../config.ini'), 'utf-8'));
    tfwords = require(config.Plugins.words);
    tffreqs = require(config.Plugins.frequencies);
}

export function run() {
    loadPlugins();
    let wordFreqs = tffreqs.top25(tfwords.extractWords('fileToRead.txt'));
    wordFreqs.forEach(wf => console.log(`${wf[0]} - ${wf[1]}`))
}