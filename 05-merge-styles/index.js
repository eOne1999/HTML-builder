const fs = require('fs');
const path = require('path');

const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        if (err) throw err;
        if (file.isFile() && file.name.split('.').slice(-1).toString() === 'css') {
            data = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8').pipe(bundle);
        }
    });
});