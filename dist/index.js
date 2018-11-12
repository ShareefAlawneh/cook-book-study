"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChapterOne_1 = require("./chapters/ChapterOne");
var chapterOne = new ChapterOne_1.ChapterOne("fileToRead.txt");
// chapterOne.run().then(res => console.log("resolved", res))
//     .catch(err => console.log("error", err));
chapterOne.run();
// function* getLine(filePath: string) {
//     let fileContent: any[] = fs.readFileSync(path.join(__dirname, `/utils/${filePath}`), 'utf-8').split(",");
//     console.log(fs.readFileSync(path.join(__dirname, `/utils/${filePath}`), 'utf-8'));
//     let i = 0;
//     console.log("file", fileContent);
//     while (true) {
//         yield fileContent[i];
//         i++;
//     }
// }
// let read = getLine("stop_words.txt");
// console.log(read.next())
// console.log(read.next())
// console.log(read.next())
// console.log(read.next())
// console.log(read.next())
// console.log(read.next())
// console.log(read.next())
// let fileReADER = readline.createInterface(
//     {
//         input: fs.createReadStream(path.join(__dirname, `/utils/word_freqs.txt`)),
//     }
// );
// fileReADER.on('line', line => {
//     console.log('my line', line);
// });
// fs.writeSync(fs.openSync(path.join(__dirname, `/utils/word_freqs.txt`), 'a'), `hello, 1\n`, 0);
//# sourceMappingURL=index.js.map