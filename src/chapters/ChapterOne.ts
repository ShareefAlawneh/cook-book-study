import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';


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

        // return fs.openSync(filePath, fs.constants.R_OK);


        // return file reader
        return readline.createInterface(
            {
                input: fs.createReadStream(filePath),
                terminal: false

            }
        );


    }

    private readFileContents = () => fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8');

    private isalnum = (str: string) => str.match(/[a-z0-9]/i);

    private range = (num: number) => Array.from(Array(num).keys());


    // to keep it simple and readable, let's imagine that the private section is a pre-built functions in typescript,
    // and the global variable, came from program argv[],
    // so the real program starts from run() method.
    public run(): void {

        let data: any[] = [this.readFileContents().split(',')]; // stop words file content (maximum 522 chars) #data[0]

        data.push([]); // line #data[1]
        data.push(null); // index of start char of the word #data[2]
        data.push(0); // i = 0 #data[3]
        data.push(false); // flag if word found #data[4]
        data.push(''); // a word holder #data[5]
        data.push(''); // a word holder #data[6]
        data.push(0); // freq of word #data[7]
        data.push(0); // a loop tracker #data[8]
        data.push(false); // indecator for only once #data[9]



        let word_freqs = this.touchOpen("word_freqs.txt");


        let freader = this.touchOpen(this.inputFile);



        // loop through the file line by line
        freader.on('line', (line: string) => {


            if (line == undefined)
                freader.close();

            if (line[line.length - 1] != '\n')
                line += '\n';

            data[1] = [line];
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
                            console.log(data[5]);



                            if (!data[9]) {
                                data[9] = true;
                                this.detemineCount(data);
                                // word_freqs.emit('line')


                            }

                            // this.readWordfreqs(word_freqs, data)
                            word_freqs.on('line', line => {
                                console.log("reading")
                                console.log("line", line)
                                if (line != undefined) {
                                    data[6] = line.trim();
                                    data[7] = parseInt(data[6].split(",")[1]);
                                    data[6] = data[6].split(",")[0].trim();


                                    if (data[5].trim() == data[6].trim()) {

                                        data[7] += 1;
                                        data[4] = true;

                                        this.detemineCount(data);
                                        word_freqs.close();

                                    }
                                } else {
                                    this.detemineCount(data)
                                }

                            });






                        }
                        data[2] = null;
                    }

                    data[3] += 1;

                }


            }



        }).on('close', () => {

            this.doPartTwo(data, word_freqs);
        });

    }



    detemineCount(data: any[]) {

        if (!data[4]) {
            fs.writeSync(fs.openSync(path.join(__dirname, `../utils/word_freqs.txt`), 'a'), `${data[5].trim()}, 1\n`);

        }


        else {
            fs.writeSync(fs.openSync(path.join(__dirname, `../utils/word_freqs.txt`), 'a'), `${data[5].trim()}, ${data[7]}\n`);

        }
    }

    doPartTwo(data: any[], word_freqs: readline.ReadLine) {

        console.log("part one done");



        // mark the array for garbage collection || flush its contents 
        data.length = 0;

        // ------------------- Part 2 -----------------
        data = [[]]; // #data[0..24]
        data.length = 25;
        data.push(''); // #data[25]
        data.push(0); // #data[26]

        data.push(0); // loop tracker #data[27]

        word_freqs.on('line', (line: string) => {

            if (line != undefined) {
                data[25] = line.trim();
                data[26] = parseInt(data[25].split(',')[1]);
                data[25] = data[25].split(',')[0].trim();



                for (data[27] in this.range(25)) {
                    if (data[data[27]] == [] || data[data[27]][1] < data[26]) {
                        data.splice(data[27], 0, [data[25], data[26]]);
                        delete data[26];
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

            if (data[27].length == 2)
                console.log(`${data[27][0]} - ${data[27][1]}`);

        }

    }




}