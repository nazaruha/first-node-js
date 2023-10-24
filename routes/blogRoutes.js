const express = require("express");
const Blog = require("../models/blog");

// it's like an app
const router = express.Router(); // create a new instance of a Router obj

// blog routes
router.get("/", (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sort by descending (from the newest to the oldest)
        .then((result) => {
            res.render("index", {title: "Blogs", blogs: result})
        })
        .catch((err) => {
            res.redirect("404", {title: "404", error_message: err});
        })
})

router.post("/", (req, res) => {
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

router.get("/create", (req, res) => {
    res.render("create", {title: 'Create a new Blog'});
})

router.get("/:id", (req, res) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .then(result => {
            res.render('details', {blog: result, title: "Blog Details"})
        })
        .catch(err => {
            console.log(err);
        })
});

router.delete("/:id", (req, res) => {
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

module.exports = router;