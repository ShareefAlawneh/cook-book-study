import { ChapterOne } from './chapters/ChapterOne';
import * as fs from 'fs';
import { Buffer } from 'buffer';
import * as path from 'path';
let chapterOne = new ChapterOne("fileToRead.txt");
chapterOne.run();

// let buffer = new Buffer(178);

// fs.readSync(fs.openSync(path.join(__dirname, "utils/fileToRead.txt"), 'r'), buffer, 0, 178, 0);

// console.log("buffer length", buffer.length);

// console.log(buffer.toString('utf-8'));

