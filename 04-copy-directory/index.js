const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

function copyDir() {
    fs.mkdir(copyPath, { recursive: true }, (err) => {
        if (err) throw err;
        console.log('Create folder');
    });

    fs.readdir(copyPath, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            fs.unlink(path.join(copyPath, file), () => {});
        });
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
}
copyDir();