"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readline = require("readline");
var replace = require("replace-in-file");
var ChapterOne = /** @class */ (function () {
    function ChapterOne(filePath) {
        this.touchOpen = function (filename) {
            var filePath = path.join(__dirname, "../utils/" + filename);
            // create a file if not exists
            if (!fs.existsSync(filePath)) {
                var fd = fs.openSync(filePath, fs.constants.O_CREAT);
                fs.closeSync(fd);
            }
            // return file reader
            return readline.createInterface(fs.createReadStream(filePath));
        };
        this.replace = function (fileName, val1, val2) {
            console.log("replacing", val1 + " = " + val2);
            var fileContent = fs.readFileSync(path.join(__dirname, "../utils/" + fileName), 'utf-8').split("\n");
            fileContent.forEach(function (item, index) {
                if (item.split(",")[0] == val1) {
                    fileContent[index] = val1 + ", " + val2;
                }
            });
            fileContent.forEach(function (item) {
                fs.writeSync(fs.openSync(path.join(__dirname, "../utils/word_freqs.txt"), 'a'), item + "\n");
            });
        };
        this.getLine = function (filePath) {
            var fileContent, _i, fileContent_1, line;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileContent = fs.readFileSync(path.join(__dirname, "../utils/" + filePath), 'utf-8').split("\n");
                        _i = 0, fileContent_1 = fileContent;
                        _a.label = 1;
                    case 1:
                        if (!(_i < fileContent_1.length)) return [3 /*break*/, 4];
                        line = fileContent_1[_i];
                        if (line == '')
                            return [2 /*return*/];
                        return [4 /*yield*/, line];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        };
        this.readFileContents = function (fileName) { return fs.readFileSync(path.join(__dirname, "../utils/" + fileName), 'utf-8'); };
        this.isalnum = function (str) { return str.match(/[a-z0-9]/i); };
        this.range = function (num) { return Array.from(Array(num).keys()); };
        this.inputFile = filePath;
    }
    // to keep it simple and readable, let's imagine that the private section is a pre-built functions in typescript,
    // and the global variable, came from program argv[],
    // so the real program starts from run() method.
    ChapterOne.prototype.run = function () {
        var _this = this;
        var data = [this.readFileContents("stop_words.txt").split(',')]; // stop words file content (maximum 522 chars) #data[0]
        data.push([]); // line #data[1]
        data.push(null); // index of start char of the word #data[2]
        data.push(0); // i = 0 #data[3]
        data.push(false); // flag if word found #data[4]
        data.push(''); // a word holder #data[5]
        data.push(''); // a word holder #data[6]
        data.push(0); // freq of word #data[7]
        data.push(0); // a loop tracker #data[8]
        var freader = this.touchOpen(this.inputFile);
        // loop through the file line by line
        freader.on('line', function (line) {
            if (line == undefined)
                freader.close();
            if (line[line.length - 1] != '\n')
                line += ' ';
            data[1] = [line];
            data[2] = null;
            data[3] = 0;
            for (var _i = 0, _a = data[1][0]; _i < _a.length; _i++) {
                data[8] = _a[_i];
                if (data[2] == null) {
                    if (_this.isalnum(data[8]) != null) {
                        data[2] = data[3];
                        data[3] += 1;
                    }
                }
                else {
                    if (_this.isalnum(data[8]) == null) {
                        data[4] = false;
                        data[5] = data[1][0].substring(data[2], data[3] + 1);
                        if (data[5].length >= 2 && !data[0].includes(data[5].trim())) {
                            var wordFreqs = _this.getLine("word_freqs.txt");
                            while (true) {
                                var next = wordFreqs.next();
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
                                        files: path.join(__dirname, "../utils/word_freqs.txt"),
                                        from: "" + next.value,
                                        to: data[5] + ", " + data[7],
                                    });
                                    break;
                                }
                            }
                            if (!data[4]) {
                                data[4] = true;
                                fs.writeSync(fs.openSync(path.join(__dirname, "../utils/word_freqs.txt"), 'a'), data[5].trim() + ", 1\n");
                            }
                        }
                        data[2] = null;
                    }
                    data[3] += 1;
                }
            }
        }).on('close', function () {
            _this.doPartTwo(data);
        });
    };
    ChapterOne.prototype.doPartTwo = function (data) {
        var _this = this;
        // mark the array for garbage collection || flush its contents
        data.length = 0;
        // ------------------- Part 2 -----------------
        data = [[]]; // #data[0..24]
        data.length = 25;
        data.push(''); // #data[25]
        data.push(0); // #data[26]
        data.push(0); // loop tracker #data[27]
        var word_freqs = this.touchOpen("word_freqs.txt");
        word_freqs.on('line', function (line) {
            if (line != undefined) {
                data[25] = line.trim();
                data[26] = parseInt(data[25].split(',')[1].trim());
                data[25] = data[25].split(',')[0].trim();
                for (var _i = 0, _a = _this.range(25); _i < _a.length; _i++) {
                    data[27] = _a[_i];
                    if (data[data[27]] == null || data[data[27]][1] < data[26]) {
                        data.splice(data[27], 0, [data[25], data[26]]);
                        break;
                    }
                }
            }
        }).on('close', function () {
            _this.printWords(data);
        });
    };
    ChapterOne.prototype.printWords = function (data) {
        data[27] = "";
        for (var _i = 0, _a = data.splice(0, 25).slice(); _i < _a.length; _i++) {
            data[27] = _a[_i];
            if (data[27] && data[27].length == 2)
                console.log(data[27][0] + " - " + data[27][1]);
        }
    };
    return ChapterOne;
}());
exports.ChapterOne = ChapterOne;
//# sourceMappingURL=ChapterOne.js.map