// const xyz = require('./people.js'); // require method automatically finds and runs the file
// console.log(xyz.people, xyz.ages);

// another way export way
const { people, ages }  = require("./people");

console.log(people, ages);

const os = require('os'); // built-in file from node.js
// good object if need to find out info about your Operating System

console.log(os.platform(), os.homedir());


