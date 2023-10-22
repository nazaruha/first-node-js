const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", "text/html" /*sending some text to the browser*/);
    
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
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    // send an html file
    if (fs.existsSync(path)) {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log("ERR => ", err);
                res.write(data.toString());
            }
            else {
                res.write(data.toString());
            }
            res.end();
        })    
    }
    

}); // method to create a server

server.listen(3000 /*port*/, 'localhost'/*ip*/, () => {
    console.log('listening for requests on port 3000');
}) // start the server on 'localhost:3000'