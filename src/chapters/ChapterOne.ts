import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

export class ChapterOne {
    inputFile: string;

    constructor(filePath: string) {
        this.inputFile = filePath;

    }

    private touchOpen = (filename: string, writeTo: string = filename) => {
        let filePath = path.join(__dirname, `../util/${filename}`);
        let writeToPath = path.join(__dirname, `../util/${writeTo}`);


        // create a file if not exists
        if (!fs.existsSync(filePath)) {
            let fd = fs.openSync(filePath, fs.constants.O_CREAT);
            fs.closeSync(fd);

        }

        // return file reader
        return readline.createInterface({
            input: fs.createReadStream(filePath),
            output: fs.createWriteStream(writeToPath),
            terminal: false
        });


    }

    private readFileContents = () => fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8');

    private isalnum = (str: string) => str.match(/^[a-z0-9]+$/i)

    public run(): void {

        let data: any[] = [this.readFileContents().split(',')];

        data.push([]);
        data.push(null);
        data.push(0);
        data.push(false);
        data.push('');
        data.push('');
        data.push(0);
        let word_freqs: readline.ReadLine = this.touchOpen("word_freqs.txt", "r+");
        // loop through the file line by line
        let file = this.touchOpen(this.inputFile, "r");

        file.on('line', (line: string) => {
            if (line[line.length - 1] != '\n')
                line += '\n';

            data[1] = [line];
            data[2] = null;
            data[3] = 0;


            for (let c of line.split("")) {
                if (data[2] == null) {
                    if (this.isalnum(c))
                        data[2] = data[3]


                } else {
                    if (!this.isalnum(c)) {
                        data[4] = false;
                        data[5] = data[1][0] + "".substring(data[2], data[3]).toLowerCase();
                        if (data[5].length >= 2 && !data[0].includes(data[5])) {
                            word_freqs.on('line', (line: string) => {
                                data[6] = line.trim();
                                data[7] = parseInt(data[6].split(",")[1]);

                                if (data[5] == data[6]) {
                                    data[7] += 1;
                                    data[4] = true;
                                    return;
                                }

                            });
                            if (!data[4])
                                word_freqs.write(`${data[5]}, 1\n`)
                            else
                                word_freqs.write(`${data[5]}, ${data[7]}\n`)



                        }
                        data[2] = null;
                    }

                    data[3] += 1;

                }


            }

        });

        file.close();
        // word_freqs.close();

        // mark the array for garbage collection
        data.length = 0;

        // ------------------- Part 2 -----------------
        data = [[]];
        data.length = 25;
        data.push('');
        data.push(0);

        word_freqs.on('line', (line: string) => {

            data[25] = line.trim();
            data[26] = parseInt(data[25].split(',')[1]);
            data[25] = data[25].split(',')[0].trim();

            for (let i of Array.from(Array(25).keys())) {
                if (data[i] == [] || data[i][1] < data[26]) {
                    data.splice(i, 0, [data[25], data[26]]);
                    delete data[26];
                    break;
                }

            }

        });

        for (let tf of data.splice(0, 25)) {
            if (tf.length == 2)
                console.log(`${tf[0]} - ${tf[1]}`);

        }

        word_freqs.close();

    }




}