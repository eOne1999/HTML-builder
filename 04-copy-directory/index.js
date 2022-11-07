const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

fs.mkdir(copyPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Create folder');
});

fs.readdir(filesPath, (err, files) => {
    files.forEach(file => {
        if (err) throw err;
        fs.copyFile(path.join(filesPath, file), path.join(copyPath, file), (err) => {
            if (err) throw err;
            console.log('Copy file');
        });
    });
});