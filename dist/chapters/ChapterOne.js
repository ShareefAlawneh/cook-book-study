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
        this.range = function (num) { return Array.from(Array(num).keys()); };
        this.inputFile = filePath;
    }
    // to keep it simple and readable, let's imagine that the private section is a pre-built functions in typescript,
    // and the global variable, came from program argv[],
    // so the real program starts from run() method.
    ChapterOne.prototype.run = function () {
        var _this = this;
        var data = [this.readFileContents().split(',')]; // stop words file content (maximum 522 chars) #data[0]
        data.push([]); // line #data[1]
        data.push(null); // index of start char of the word #data[2]
        data.push(0); // i = 0 #data[3]
        data.push(false); // flag if word found #data[4]
        data.push(''); // a word holder #data[5]
        data.push(''); // a word holder #data[6]
        data.push(0); // freq of word #data[7]
        data.push(0); // a loop tracker #data[8]
        var word_freqs = this.touchOpen("word_freqs.txt", "r+");
        // loop through the file line by line
        var file = this.touchOpen(this.inputFile, "r");
        file.on('line', function (line) {
            if (line[line.length - 1] != '\n')
                line += '\n';
            data[1] = [line];
            data[2] = null;
            data[3] = 0;
            for (var _i = 0, _a = line.split(""); _i < _a.length; _i++) {
                data[8] = _a[_i];
                if (data[2] == null) {
                    if (_this.isalnum(data[8]))
                        data[2] = data[3];
                }
                else {
                    if (!_this.isalnum(data[8])) {
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
        // mark the array for garbage collection || flush its contents 
        data.length = 0;
        // ------------------- Part 2 -----------------
        data = [[]]; // #data[0..24]
        data.length = 25;
        data.push(''); // #data[25]
        data.push(0); // #data[26]
        data.push(0); // loop tracker #data[27]
        word_freqs.on('line', function (line) {
            data[25] = line.trim();
            data[26] = parseInt(data[25].split(',')[1]);
            data[25] = data[25].split(',')[0].trim();
            for (data[27] in _this.range(25)) {
                if (data[data[27]] == [] || data[data[27]][1] < data[26]) {
                    data.splice(data[27], 0, [data[25], data[26]]);
                    delete data[26];
                    break;
                }
            }
        });
        data[27] = '';
        for (var _i = 0, _a = data.splice(0, 25); _i < _a.length; _i++) {
            data[27] = _a[_i];
            if (data[27].length == 2)
                console.log(data[27][0] + " - " + data[27][1]);
        }
        word_freqs.close();
    };
    return ChapterOne;
}());
exports.ChapterOne = ChapterOne;
//# sourceMappingURL=ChapterOne.js.map