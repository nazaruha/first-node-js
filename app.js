const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000); // automatically infers to the localhost

app.get("/", (req, res) => {
    // this send method automatically recognises what kind of data you want to send
    res.send("<p>home page</p>"); 
})