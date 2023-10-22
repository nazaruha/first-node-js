const fs = require('fs');

const readStream = fs.createReadStream("./docs/blog3.txt", {encoding: 'utf8'}); // encoding we need to get data in a propriate way
const writeStream = fs.createWriteStream("./docs/blog4.txt", {encoding: 'utf8'});

// 'on' method is an event listener
readStream.on('data', (chunk) => {
    console.log("------ NEW CHUNK ------");
    console.log(chunk);
    writeStream.write("\nNEW  CHUNK\n"); // how to pass data into stream
    writeStream.write(chunk); // how to pass data into stream
})