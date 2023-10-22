const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", "text/html" /*sending some text to the browser*/);
    
    // send an html file
    if (fs.existsSync("./views/index.html")) {
        fs.readFile("./views/index.html", (err, data) => {
            if (err) {
                console.log("ERR => ", err);
                res.write("<h1>Page not found 404!</h1>");
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