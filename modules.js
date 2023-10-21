// const xyz = require('./people.js'); // require method automatically finds and runs the file
// console.log(xyz.people, xyz.ages);

// another export way
const { people, ages }  = require("./people");

console.log(people, ages);


