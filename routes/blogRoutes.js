const express = require("express");
const blogController = require("../controllers/blogController");

// it's like an `app`
const router = express.Router(); // create a new instance of a Router obj

// blog routes
router.get("/", blogController.blog_index); // `req` and `res` will be pasted automatically

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

module.exports = router;