const LANG = "de"

const fs = require("fs");
const json = require(`./${LANG}.json`);
let files = {};

Object.keys(json).forEach(key => {
    let value = json[key];
    let keySplit = key.split(".");
    let file = keySplit[0];
    keySplit.shift();
    if(!files[file]) {
        files[file] = {};
    }
    files[file][keySplit.join(".")] = value;
});

Object.keys(files).forEach(file => {
    let value = files[file];
    fs.writeFileSync(`./${LANG}/${file}.json`, JSON.stringify(value, null, "\t"));
});