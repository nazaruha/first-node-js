const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000); // automatically infers to the localhost

app.get("/", (req, res) => {
    // this `send` method automatically recognises what kind of data you want to send
    //res.send("<p>home page</p>"); 

    // `sendFile` method - how to easy export html files.
    // BUT you need to pass the root directory, 'cause express doesn't where from to start
    res.sendFile("./views/index.html", {root: __dirname});
});

app.get("/about", (req, res) => {
    res.sendFile("./views/about.html", {root: __dirname});
});

//redirects
app.get("/about-us", (req, res) => {
    res.redirect("/about"); // that's it... easy
});

// 404 page
// it works when no response was successfull.
// must be in the bottom of all routes. routes under it won't work
app.use((req, res) => { 
    res.status(404).sendFile("./views/404.html", {root: __dirname});
})