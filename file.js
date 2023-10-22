const fs = require('fs'); // fs - File System

// reading files
fs.readFile("./docs/blog1.txt", (err, data) => { // when reading file is done - it excecutes this code
    if (err) {
        console.log(err);
    }
    //console.log(data); // get the buffer
    console.log(data.toString());

});

// writing files


// directories


// deleting files