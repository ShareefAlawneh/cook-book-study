import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as replace from 'replace-in-file';
import { performance } from 'perf_hooks';

export class ChapterOne {
    inputFile: string;


    constructor(filePath: string) {
        this.inputFile = filePath;

    }

    private touchOpen = (filename: string) => {
        let filePath = path.join(__dirname, `../utils/${filename}`);

        // create a file if not exists
        if (!fs.existsSync(filePath)) {
            let fd = fs.openSync(filePath, fs.constants.O_CREAT);
            fs.closeSync(fd);

        }
        // return file reader
        return readline.createInterface(fs.createReadStream(filePath));
    }

    private getLine = function* (filePath: string) {
        let fileContent: any[] = fs.readFileSync(path.join(__dirname, `../utils/${filePath}`), 'utf-8').split("\n");

        for (let line of fileContent) {
            if (line == '')
                return;
            yield line
        }


    }
    private readFileContents = (fileName: string) => fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8');

    private isalnum = (str: string) => str.match(/[a-z0-9]/i);

    private range = (num: number) => Array.from(Array(num).keys());


    // to keep it simple and readable, let's imagine that the private section is a pre-built functions in typescript,
    // and the global variable, came from program argv[],
    // so the real program starts from run() method.
    public run(): void {

        let data: any[] = [this.readFileContents("stop_words.txt").split(',')]; // stop words file content (maximum 522 chars) #data[0]

        data.push([]); // line #data[1]
        data.push(null); // index of start char of the word #data[2]
        data.push(0); // i = 0 #data[3]
        data.push(false); // flag if word found #data[4]
        data.push(''); // a word holder #data[5]
        data.push(''); // a word holder #data[6]
        data.push(0); // freq of word #data[7]
        data.push(0); // a loop tracker #data[8]
        data.push(0) // bytes indecator #data[9]


        let buffer = new Buffer(46 * 2); // a buffer will hold 3 lines each one has at most 88 chars + 1 \n = 89, in the file i used a lines with 45 chars (bytes)
        data[9] = fs.readSync(fs.openSync(path.join(__dirname, "../utils/fileToRead.txt"), 'r'), buffer, 0, buffer.length, data[9]);
        let p0 = performance.now();
        // loop through the file line by line
        while (data[9]) {
            if (fs.readSync(fs.openSync(path.join(__dirname, "../utils/fileToRead.txt"), 'r'), buffer, 0, buffer.length, data[9]))
                data[9] += fs.readSync(fs.openSync(path.join(__dirname, "../utils/fileToRead.txt"), 'r'), buffer, 0, buffer.length, data[9]);
            else data[9] = 0;


            data[1] = [buffer.toString('utf-8').replace(new RegExp('\r\n', 'g'), ' ').replace(new RegExp('\u0000', 'g'), ' ')];

            data[2] = null;
            data[3] = 0;


            for (data[8] of data[1][0]) {

                if (data[2] == null) {
                    if (this.isalnum(data[8]) != null) {
                        data[2] = data[3];
                        data[3] += 1;
                    }


                } else {
                    if (this.isalnum(data[8]) == null) {
                        data[4] = false;


                        data[5] = data[1][0].substring(data[2], data[3] + 1);


                        if (data[5].length >= 2 && !data[0].includes(data[5].trim())) {
                            let wordFreqs = this.getLine("word_freqs.txt");

                            while (true) {

                                let next = wordFreqs.next();

                                if (next.done || next.value == undefined) {
                                    break;
                                }

                                data[6] = next.value.trim();

                                data[7] = parseInt(data[6].split(",")[1]);
                                data[6] = data[6].split(",")[0].trim();



                                if (data[5].trim() == data[6].trim()) {

                                    data[7] += 1;
                                    data[4] = true;
                                    replace.sync({
                                        files: path.join(__dirname, `../utils/word_freqs.txt`),
                                        from: `${next.value}`,
                                        to: `${data[5]}, ${data[7]}`,
                                    });

                                    break;
                                }

                            }
                            if (!data[4]) {
                                data[4] = true;

                                fs.writeSync(fs.openSync(path.join(__dirname, `../utils/word_freqs.txt`), 'a'), `${data[5].trim()}, 1\n`);

                            }
                        }
                        data[2] = null;
                    }

                    data[3] += 1;

                }


            }
        }
        let p1 = performance.now();
        console.log("Execution Time in ms: ", p1 - p0);
        this.doPartTwo(data);
    }





    doPartTwo(data: any[]) {
        // mark the array for garbage collection || flush its contents
        data.length = 0;

        // ------------------- Part 2 -----------------
        data = [[]]; // #data[0..24]
        data.length = 25;
        data.push(''); // #data[25]
        data.push(0); // #data[26]

        data.push(0); // loop tracker #data[27]

        let word_freqs = this.touchOpen("word_freqs.txt");
        word_freqs.on('line', (line: string) => {
            if (line != undefined) {
                data[25] = line.trim();
                data[26] = parseInt(data[25].split(',')[1].trim());
                data[25] = data[25].split(',')[0].trim();

                for (data[27] of this.range(25)) {

                    if (data[data[27]] == null || data[data[27]][1] < data[26]) {
                        data.splice(data[27], 0, [data[25], data[26]]);
                        break;
                    }

                }

            }

        }).on('close', () => {
            this.printWords(data);
        });
    }


    printWords(data: any[]) {
        data[27] = "";

        for (data[27] of [...data.splice(0, 25)]) {
            if (data[27] && data[27].length == 2)
                console.log(`${data[27][0]} - ${data[27][1]}`);
        }

    }




}