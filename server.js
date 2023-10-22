const http = require("http");

const server = http.createServer((req, res) => {
    console.log('request made');
}); // method to create a server

server.listen(3000 /*port*/, 'localhost'/*ip*/, () => {
    console.log('listening for requests on port 3000');
}) // start the server on 'localhost:3000'