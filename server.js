const http = require("http");
const fs = require('fs');
const _ = require("lodash");

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);

    // lodash
    const num = _.random(0, 20); // returns a random number 0-20
    console.log(num);

    const greet = _.once(() => { // prevent repeating function
        console.log('hello');
    });

    greet();
    greet(); // won't be executed

    //set header content type
    res.setHeader("Content-Type", "text/html" /*sending some text to the browser*/);
    
    //routing
    let path = './views/';
    switch (req.url) {
        case '/':
            path += "index.html";
            res.statusCode = 200;
            break;
        case '/about':
            path += "about.html";
            res.statusCode = 200;
            break;
        case '/about-uss': // redirect
            res.statusCode = 301; // range 300 statuses are for redirect
            res.setHeader("Location", "/about" /*where to redirect*/);
            res.end();
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log("ERR => ", err);
            res.end();
        }
        res.end(data); // both outputs html and ends the response
    })    
    

}); // method to create a server

server.listen(3000 /*port*/, 'localhost'/*ip*/, () => {
    console.log('listening for requests on port 3000');
}) // start the server on 'localhost:3000'