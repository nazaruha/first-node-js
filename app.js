const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://netninja:Qwerty-1@cluster0.5jfcytu.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } /* just to avoid deprecated messages in the terminal */)
    .then((result) => {
        console.log("connected to DB");
        // listen for requests
        app.listen(3000); // automatically infers to the localhost
        // replaced, because we want to connect to the server when we successfully connected to the DB. IT LOGICAL
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })

//register view engine (connect ejs)
app.set('view engine', 'ejs'); // the default directory for EJSs is the 'views' directory
app.set("views" /*what to change*/, "./views/ejs"/*new directory name*/); // if you have another directory for views - set up another direcoty name for it for exmpl: 'myviews'

// simple middleware example
// app.use((req, res, next) => { // will fire after each request 'cause it's on the top
//     console.log("new request made:");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method", req.method);
//     next(); // alows to work request under it
// });

//  morgan middleware & static files
app.use(express.static("public")); // setted that we access static files in the `public` directory. There we can add our css and smth else I guess
app.use(morgan("dev")); // output the hostname, path, method and other useful things after every request in our way

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: 'New blog 2',
        snippet: 'about me new blog',
        body: 'more about my new blog'
    }); // create new instance

    // async method
    blog.save() // saves new instance to the db;
        .then((result) => res.send(result))
        .catch((err) => res.status(404).render("404", { title: 404, error_message: err }));
});

app.get("/all-blogs", (req, res) => {
    Blog.find() // gets all blogs from db
        .then((result) => res.send(result))
        .catch((err) => cres.status(404).render("404", { title: 404, error_message: err }));
})

app.get("/single-blog/:id", (req, res) => {
    const blogId = req.params.id; // get id from URL
    Blog.findById(blogId.toString()) // gets a blog by id
        .then((result) => res.send(result))
        .catch((err) => res.status(404).render("404", { title: 404, error_message: err }));
})

app.get("/", (req, res) => {
    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Mario finds starts", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur"},
    ]
    res.render("index", {title: 'Home', blogs: blogs}); // will look for `index.ejs` file inside `views` directory
    // create `title` var with value `Home` and can use it as a js inside `index.ejs` file
});

// simple middleware example
// app.use((req, res, next) => { // will fire after each request instead of which are above it
//     console.log("in the next middleware1");
//     next();
// });

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