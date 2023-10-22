const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", "text/plain" /*sending some text to the browser*/);
    res.write("hello, ninjas"); // what content send to the browser
    res.end(); // end the response
}); // method to create a server

server.listen(3000 /*port*/, 'localhost'/*ip*/, () => {
    console.log('listening for requests on port 3000');
}) // start the server on 'localhost:3000'