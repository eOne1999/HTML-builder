const fs = require('fs');
const path = require('path');

const textTxt = fs.createWriteStream(path.join(__dirname, './text.txt'));
process.stdout.write('Hello! Type some text here: \n');
process.stdin.on('data', data => {
    if (data.toString().includes('exit')) {
        console.log('Goodbye!');
        process.exit();
    }
    textTxt.write(data.toString());
});
process.on('SIGINT', () => {
    console.log('Goodbye!');
    process.exit();
});