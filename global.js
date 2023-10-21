// Global object

//console.log(global);

/*global.*/setTimeout(() => {
    console.log('in the timeout');
    clearInterval(interval); // stops our interval
}, 3000);

const interval = setInterval(() => {
    console.log('in the interval');
}, 1000);