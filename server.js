const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", "text/html" /*sending some text to the browser*/);
    res.write("<h1 style=\"color: red;\">hello, ninjas</h1>"); // what content send to the browser
    res.end(); // end the response
}); // method to create a server

server.listen(3000 /*port*/, 'localhost'/*ip*/, () => {
    console.log('listening for requests on port 3000');
}) // start the server on 'localhost:3000'