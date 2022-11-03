const fs = require('fs');
const path = require('path');

data = fs.createReadStream(path.join(__dirname, './text.txt'));

data.on('data', text => {
    console.log(text.toString());
}
);