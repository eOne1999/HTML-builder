const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});

function createHtml() {
    const template = fs.createReadStream(path.join(__dirname, 'template.html'));
    let templateContent = '';
    template.on('data', data => templateContent = data);
    template.on('end', () => {
        fs.readdir(path.join(__dirname, 'components'), (err, files) => {
            files.forEach(file => {
                if (err) throw err;
                const component = fs.createReadStream(path.join(__dirname, 'components', file));
                let componentContent = '';
                component.on('data', data => {
                    componentContent += data;
                });
                component.on('end', () => {
                    templateContent = templateContent.toString().replace(`{{${file.split('.').slice(0, -1).toString()}}}`, componentContent);
                    const bundleHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                    bundleHtml.write(templateContent);
                });
            });
        });
    });
}

function createCss() {
const bundleCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        if (err) throw err;
        if (file.isFile() && file.name.split('.').slice(-1).toString() === 'css') {
            data = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8').pipe(bundleCss);
        }
    });
});
}

function copyDir(source, target) {
    const filesPath = path.join(__dirname, source);
    const copyPath = path.join(__dirname, target);

    fs.mkdir(copyPath, { recursive: true }, (err) => {
        if (err) throw err;
    });

    fs.readdir(filesPath, { withFileTypes: true }, (err, files) => {
        files.forEach(file => {
            if (err) throw err;
            if (file.isFile())
                fs.copyFile(path.join(filesPath, file.name), path.join(copyPath, file.name), (err) => {
                    if (err) throw err;
                });
            else copyDir(`${source}/${file.name}`, `${target}/${file.name}`);
        });
    });
}

createHtml();
createCss();
copyDir('assets', 'project-dist/assets');
