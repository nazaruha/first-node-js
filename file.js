const fs = require('fs'); // fs - File System

// READING FILES
/*
fs.readFile("./docs/blog1.txt", (err, data) => { // when reading file is done - it excecutes this code
    if (err) {
        console.log(err);
    }
    //console.log(data); // get the buffer
    console.log(data.toString());

});

console.log("last line"); // will be excecuted the firts. Because when the file is being reading - the compiler excecute the next code to not lose the time
*/

// WRITING FILES 
// fs.writeFile('./docs/blog1.txt' /*path*/, "hi, dudes!" /*text to write*/, () => {
//     /* code that will execute when the file will be written */
//     console.log("file was written");
// });

// fs.writeFile('./docs/blog2.txt' /*path. Creates file if it doesn't exist*/, "hi, dudes!" /*text to write*/, () => {
//     /* code that will execute when the file will be written */
//     console.log("file was written");
// });


// DIRECTORIES
if (!fs.existsSync("./assets")) { // whether the directory doesn't exist
    fs.mkdir("./assets", (err) => { // create direcotry. ASYNC METHOD
        if (err) {
            console.log(err);
        }
        console.log("folder created");
    });
}
else {
    console.log("folder already exists.");
    fs.rmdir("./assets", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder deleted");
    })
}


// DELETING FILES