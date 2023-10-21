// Global object

//console.log(global);

// /*global.*/setTimeout(() => {
//     console.log('in the timeout');
//     clearInterval(interval); // stops our interval
// }, 3000);

// const interval = setInterval(() => {
//     console.log('in the interval');
// }, 1000);

// gets the absolute path of the current folder without file in which it works
console.log(__dirname); 
// gets the absolute path of the folder with the file name added on as well
console.log(__filename); 