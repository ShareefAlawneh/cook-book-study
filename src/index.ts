import { ChapterOne } from './chapters/ChapterOne';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

let chapterOne = new ChapterOne("fileToRead.txt");

// chapterOne.run().then(res => console.log("resolved", res))
//     .catch(err => console.log("error", err));

chapterOne.run();

// let fileReADER = readline.createInterface(
//     {
//         input: fs.createReadStream(filePath),

//     }
// );



// fileReADER.on('line', line => {

//     console.log('my line', line);
// });


// fs.writeSync(fs.openSync(path.join(__dirname, `/utils/word_freqs.txt`), 'w'), `hello, 1\n`, 0);



