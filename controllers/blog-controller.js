const mongoose = require("mongoose");
const Blog = require("../model/Blog.js");
const User = require("../model/User.js");

module.exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    }
    catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
}

module.exports.addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        await blog.save();
    }
    catch (err) {
        return console.log(err);
    }
    return res.status(200).json({ blog })
};

module.exports.updateBlog = async (req, res, next) => {

}