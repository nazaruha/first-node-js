const express = require("express");

// express app
const app = express();

//register view engine
app.set('view engine', 'ejs'); // the default directory for EJSs is the 'views' directory
app.set("views" /*what to change*/, "./views/ejs"/*new directory name*/); // if you have another directory for views - set up another direcoty name for it for exmpl: 'myviews'

// listen for requests
app.listen(3000); // automatically infers to the localhost

app.get("/", (req, res) => {
    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Mario finds starts", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur"},
    ]
    res.render("index", {title: 'Home', blogs: blogs}); // will look for `index.ejs` file inside `views` directory
    // create `title` var with value `Home` and can use it as a js inside `index.ejs` file
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