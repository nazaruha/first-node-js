const mongoose = require("mongoose");
const Schema = mongoose.Schema; // this for creating our models

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true /* auto assign vlaues to this properties*/});

const Blog = mongoose.model(
    'Blog' /* this is our table */,
    blogSchema /* schema for it */);

module.exports = Blog;
