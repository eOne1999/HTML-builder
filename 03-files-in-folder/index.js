const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    files.forEach(element => {
    if (err) console.log(err);
    else if (element.isFile()) {
        const [fileName, extName] = element.name.split('.');
        
        fs.stat(path.join(__dirname, 'secret-folder', element.name), (err, stats) => {
            if (err) console.log(err);
            else console.log(`${fileName} - ${extName} - ${stats.size / 1024}kb`);
        });
    };
});
});