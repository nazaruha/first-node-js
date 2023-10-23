const express = require("express");

// express app
const app = express();

//register view engine
app.set('view engine', 'ejs'); // the default directory for EJSs is the 'views' directory
app.set("views" /*what to change*/, "./views/ejs"/*new directory name*/); // if you have another directory for views - set up another direcoty name for it for exmpl: 'myviews'

// listen for requests
app.listen(3000); // automatically infers to the localhost

app.use((req, res, next) => { // will fire after each request 'cause it's on the top
    console.log("new request made:");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method", req.method);
    next(); // alows to work request under it
});



app.get("/", (req, res) => {
    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Mario finds starts", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur"},
    ]
    res.render("index", {title: 'Home', blogs: blogs}); // will look for `index.ejs` file inside `views` directory
    // create `title` var with value `Home` and can use it as a js inside `index.ejs` file
});

app.use((req, res, next) => {
    console.log("in the next middleware1");
    next();
});

app.get("/about", (req, res) => {
    res.render("about", {title: 'About'});
});

//redirect will work automatically

app.get("/blogs/create", (req, res) => {
    res.render("create", {title: 'Create a new Blog'});
})

// 404 page
// it works when no response was successfull.
// must be in the bottom of all routes. routes under it won't work
app.use((req, res) => { 
    res.status(404).render("404", {title: '404'});
})