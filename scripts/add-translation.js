const fs = require('fs');
const args = process.argv.slice(2);

const i18nBasePath = './src/assets/i18n';
const i18nExtension = '.json';

function checkExists(path) {
    if (!fs.existsSync(path)) {
        throw new Error('File not found: ' + path);
    }

    return true;
}

function readFile(path) {
    return checkExists(path) && JSON.parse(fs.readFileSync(path).toString());
}

function writeFile(path, data) {
    return checkExists(path) && fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function contructPath(lang) {
    return [i18nBasePath, lang + i18nExtension].join('/')
}

function printHelp() {
    console.log(
        `
    (Adds translations to files)

    add-translation [key] [es] [en]

    * [key]   - Translation Key
    * [es]    - Translation for "spanish" (ie: hola)
    * [en]    - Translation for "english"
        `
    );
}

function addPropToFile(key, value, lang) {
    console.log('Adding translations for "' + lang + '": ');
    console.log('  * Key:   ' + key);
    console.log('  * Value: ' + value);
    console.log('');

    const filePath = contructPath(lang);
    const jsonData = readFile(filePath);

    jsonData[key] = value;

    writeFile(filePath, jsonData);
}

if (args.length <= 1) {
    return printHelp();
}

// Now lets add the translations
console.log(args);
let [key, es, en] = args;

if (!en) {
    en = key;
}

addPropToFile(key, es, 'es');
addPropToFile(key, en, 'en');