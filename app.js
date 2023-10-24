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

//  morgan middleware & static files
app.use(express.static("public")); // setted that we access static files in the `public` directory. There we can add our css and smth else I guess
app.use(express.urlencoded()); // for parsing data from HTML to the SERVER
app.use(morgan("dev")); // output the hostname, path, method and other useful things after every request in our way

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", {title: 'About'});
});

//redirect will work automatically

// blog routes
app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sort by descending (from the newest to the oldest)
        .then((result) => {
            res.render("index", {title: "Blogs", blogs: result})
        })
        .catch((err) => {
            res.redirect("404", {title: "404", error_message: err});
        })
})

app.post("/blogs", (req, res) => {
    console.log(req.body); // get the posted data from HTML;
    
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            console.log(result);
            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/blogs/create", (req, res) => {
    res.render("create", {title: 'Create a new Blog'});
})

app.get("/blogs/:id", (req, res) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .then(result => {
            res.render('details', {blog: result, title: "Blog Details"})
        })
        .catch(err => {
            console.log(err);
        })
});

app.delete("/blogs/:id", (req, res) => {
    const blogId = req.params.id;

    Blog.findByIdAndDelete(blogId)
        .then((result) => {
            // don't use redirect 'cause we get data from script js in in the details.ejs
            res.json({ redirect: '/blogs' }); // the same as redirect but look above comment
        })
        .catch((err) => {
            console.log(err)
        });
});

// 404 page
// it works when no response was successfull.
// must be in the bottom of all routes. routes under it won't work
app.use((req, res) => { 
    res.status(404).render("404", {title: '404', error_message: ""});
})