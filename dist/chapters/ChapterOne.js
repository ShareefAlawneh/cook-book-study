"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var readline = __importStar(require("readline"));
var ChapterOne = /** @class */ (function () {
    function ChapterOne(filePath) {
        this.touchOpen = function (filename, writeTo) {
            if (writeTo === void 0) { writeTo = filename; }
            var filePath = path.join(__dirname, "../util/" + filename);
            var writeToPath = path.join(__dirname, "../util/" + writeTo);
            // create a file if not exists
            if (!fs.existsSync(filePath)) {
                var fd = fs.openSync(filePath, fs.constants.O_CREAT);
                fs.closeSync(fd);
            }
            // return file reader
            return readline.createInterface({
                input: fs.createReadStream(filePath),
                output: fs.createWriteStream(writeToPath),
                terminal: false
            });
        };
        this.readFileContents = function () { return fs.readFileSync(path.join(__dirname, '../utils/stop_words.txt'), 'utf-8'); };
        this.isalnum = function (str) { return str.match(/^[a-z0-9]+$/i); };
        this.inputFile = filePath;
    }
    ChapterOne.prototype.run = function () {
        var _this = this;
        var data = [this.readFileContents().split(',')];
        data.push([]);
        data.push(null);
        data.push(0);
        data.push(false);
        data.push('');
        data.push('');
        data.push(0);
        var word_freqs = this.touchOpen("word_freqs.txt", "r+");
        // loop through the file line by line
        var file = this.touchOpen(this.inputFile, "r");
        file.on('line', function (line) {
            if (line[line.length - 1] != '\n')
                line += '\n';
            data[1] = [line];
            data[2] = null;
            data[3] = 0;
            for (var c in line.split("")) {
                if (data[2] == null) {
                    if (_this.isalnum(c))
                        data[2] = data[3];
                }
                else {
                    if (!_this.isalnum(c)) {
                        data[4] = false;
                        data[5] = data[1][0] + "".substring(data[2], data[3]).toLowerCase();
                        if (data[5].length >= 2 && !data[0].includes(data[5])) {
                            word_freqs.on('line', function (line) {
                                data[6] = line.trim();
                                data[7] = parseInt(data[6].split(",")[1]);
                                if (data[5] == data[6]) {
                                    data[7] += 1;
                                    data[4] = true;
                                    return;
                                }
                            });
                            if (!data[4])
                                word_freqs.write(data[5] + ", 1\n");
                            else
                                word_freqs.write(data[5] + ", " + data[7] + "\n");
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
        word_freqs.on('line', function (line) {
            data[25] = line.trim();
            data[26] = parseInt(data[25].split(',')[1]);
            data[25] = data[25].split(',')[0].trim();
            for (var i in Array.from(Array(25).keys())) {
                if (data[i] == [] || data[i][1] < data[26]) {
                    data.splice(0, 0, [data[5], data[6]]);
                }
            }
        });
    };
    return ChapterOne;
}());
exports.ChapterOne = ChapterOne;
//# sourceMappingURL=ChapterOne.js.map