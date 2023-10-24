const Blog = require("../models/blog");
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sort by descending (from the newest to the oldest)
    .then((result) => {
        res.render("blogs/index", {title: "Blogs", blogs: result})
    })
    .catch((err) => {
        res.redirect("404", {title: "404", error_message: err});
    })
}

const blog_details = (req, res) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .then(result => {
            res.render('blogs/details', {blog: result, title: "Blog Details"})
        })
        .catch(err => {
            console.log(err);
        })
}

const blog_create_get = (req, res) => {
    res.render("blogs/create", {title: 'Create a new Blog'});
}

const blog_create_post = (req, res) => {
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
}

const blog_delete = (req, res) => {
    const blogId = req.params.id;

    Blog.findByIdAndDelete(blogId)
        .then((result) => {
            // don't use redirect 'cause we get data from script js in in the details.ejs
            res.json({ redirect: '/blogs' }); // the same as redirect but look above comment
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}