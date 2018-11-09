"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChapterOne_1 = require("./chapters/ChapterOne");
var chapterOne = new ChapterOne_1.ChapterOne("fileToRead.txt");
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
//# sourceMappingURL=index.js.map