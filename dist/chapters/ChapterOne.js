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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readline = require("readline");
var replace = require("replace-in-file");
var perf_hooks_1 = require("perf_hooks");
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
        this.getLine = function (filePath) {
            var e_1, _a, fileContent, fileContent_1, fileContent_1_1, line, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileContent = fs.readFileSync(path.join(__dirname, "../utils/" + filePath), 'utf-8').split("\n");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        fileContent_1 = __values(fileContent), fileContent_1_1 = fileContent_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!fileContent_1_1.done) return [3 /*break*/, 5];
                        line = fileContent_1_1.value;
                        if (line == '')
                            return [2 /*return*/];
                        return [4 /*yield*/, line];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        fileContent_1_1 = fileContent_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (fileContent_1_1 && !fileContent_1_1.done && (_a = fileContent_1.return)) _a.call(fileContent_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
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
        var e_2, _a;
        var data = [this.readFileContents("stop_words.txt").split(',')]; // stop words file content (maximum 522 chars) #data[0]
        data.push([]); // line #data[1]
        data.push(null); // index of start char of the word #data[2]
        data.push(0); // i = 0 #data[3]
        data.push(false); // flag if word found #data[4]
        data.push(''); // a word holder #data[5]
        data.push(''); // a word holder #data[6]
        data.push(0); // freq of word #data[7]
        data.push(0); // a loop tracker #data[8]
        data.push(0); // bytes indecator #data[9]
        data.push(new Buffer(46 * 2));
        // let data[10] = new Buffer(46 * 2); // a buffer will hold 3 lines each one has at most 88 chars + 1 \n = 89, in the file i used a lines with 45 chars (bytes)
        data[9] = fs.readSync(fs.openSync(path.join(__dirname, "../utils/fileToRead.txt"), 'r'), data[10], 0, data[10].length, data[9]);
        var p0 = perf_hooks_1.performance.now();
        // loop through the file line by line
        while (data[9]) {
            if (fs.readSync(fs.openSync(path.join(__dirname, "../utils/fileToRead.txt"), 'r'), data[10], 0, data[10].length, data[9]))
                data[9] += fs.readSync(fs.openSync(path.join(__dirname, "../utils/fileToRead.txt"), 'r'), data[10], 0, data[10].length, data[9]);
            else
                data[9] = 0;
            data[1] = [data[10].toString('utf-8').replace(new RegExp('\r\n', 'g'), ' ').replace(new RegExp('\u0000', 'g'), ' ')];
            data[2] = null;
            data[3] = 0;
            try {
                for (var _b = __values(data[1][0]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    data[8] = _c.value;
                    if (data[2] == null) {
                        if (this.isalnum(data[8]) != null) {
                            data[2] = data[3];
                            data[3] += 1;
                        }
                    }
                    else {
                        if (this.isalnum(data[8]) == null) {
                            data[4] = false;
                            data[5] = data[1][0].substring(data[2], data[3] + 1);
                            if (data[5].length >= 2 && !data[0].includes(data[5].trim())) {
                                var wordFreqs = this.getLine("word_freqs.txt");
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
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var p1 = perf_hooks_1.performance.now();
        console.log("Execution Time in ms: ", p1 - p0);
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
            var e_3, _a;
            if (line != undefined) {
                data[25] = line.trim();
                data[26] = parseInt(data[25].split(',')[1].trim());
                data[25] = data[25].split(',')[0].trim();
                try {
                    for (var _b = __values(_this.range(25)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        data[27] = _c.value;
                        if (data[data[27]] == null || data[data[27]][1] < data[26]) {
                            data.splice(data[27], 0, [data[25], data[26]]);
                            break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }).on('close', function () {
            var e_4, _a;
            data[27] = "";
            try {
                for (var _b = __values(__spread(data.splice(0, 25))), _c = _b.next(); !_c.done; _c = _b.next()) {
                    data[27] = _c.value;
                    if (data[27] && data[27].length == 2)
                        console.log(data[27][0] + " - " + data[27][1]);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        });
    };
    return ChapterOne;
}());
exports.ChapterOne = ChapterOne;
//# sourceMappingURL=ChapterOne.js.map