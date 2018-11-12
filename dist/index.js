"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChapterOne_1 = require("./chapters/ChapterOne");
var chapterOne = new ChapterOne_1.ChapterOne("fileToRead.txt");
chapterOne.run();
// let buffer = new Buffer(178);
// fs.readSync(fs.openSync(path.join(__dirname, "utils/fileToRead.txt"), 'r'), buffer, 0, 178, 0);
// console.log("buffer length", buffer.length);
// console.log(buffer.toString('utf-8'));
//# sourceMappingURL=index.js.map