const fs = require('fs');

const readStream = fs.createReadStream("./docs/blog3.txt", {encoding: 'utf8'}); // encoding we need to get data in a propriate way

// 'on' method is an event listener
readStream.on('data', (chunk) => {
    console.log("------ NEW CHUNK ------");
    console.log(chunk);
})