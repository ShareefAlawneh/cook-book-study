import * as fs from 'fs';
import * as path from 'path';
let sqlite3 = require('sqlite3').verbose();


function createDbSchema(connection) {
    connection.serialize(function () {
        connection.run('CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        connection.run('CREATE TABLE IF NOT EXISTS words (id, doc_id, value)');
        connection.run('CREATE TABLE IF NOT EXISTS chararcters (id, word_id, value)');
    });
}

function loadFileIntoDb(fileName, connection) {
    function _extractWords(fileName) {
        let stopWords = fs.readFileSync(path.join(__dirname, `../utils/stop_words.txt`), 'utf-8').split(",");
        stopWords.push(...Array.from("abcdefghijklmnopqrstuvwxyz"));

        let data = fs.readFileSync(path.join(__dirname, `../utils/${fileName}`), 'utf-8').split('').join('')
            .replace(new RegExp('[^a-zA-Z0-9]+'), ' ').toLowerCase().split(/[\s,]+/);

        return data.filter(word => !stopWords.includes(word));
    }

    let words = _extractWords(fileName);
    let docId;
    let wordId;
    connection.serialize(function () {
        let stmt = connection.prepare(`INSERT INTO documents (name) VALUES (?)`);
        stmt.run(fileName);
        connection.get(`SELECT (id) FROM documents WHERE name = (?)`, [fileName], (err, rows) => {
            if (err) {

                docId = 0;
                return;
            }

            docId = rows['id'];
            connection.each(`SELECT MAX(id) as max FROM words`, function (error, rows) {
                wordId = rows['max'];
                if (wordId == undefined) {
                    wordId = 0;
                }

                for (let word of words) {
                    let stmt2 = connection.prepare(`INSERT INTO words VALUES(?,?,?)`);
                    stmt2.run(wordId, docId, word);
                    let charId = 0;
                    for (let char of word) {
                        let stmt3 = connection.prepare(`INSERT INTO chararcters VALUES(?,?,?)`);
                        stmt3.run(charId, wordId, char);
                        charId += 1;
                    }
                    wordId += 1;
                }
                printAll(connection);
            });
        });



    });

}


export function run() {
    let connection = new sqlite3.Database(path.join(__dirname, '../tb.db3'));
    createDbSchema(connection);
    loadFileIntoDb('fileToRead.txt', connection);
}

function printAll(connection) {
    connection.serialize(function () {
        connection.all(`SELECT value, COUNT(*) AS c From words GROUP BY value ORDER BY c DESC`, [], function (err, rows) {
            for (let row of rows) {
                console.log(row['value'], '-', row['c']);
            }
        });

    });
}
