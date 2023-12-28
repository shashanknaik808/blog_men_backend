const mongoose = require("mongoose");
const Blog = require("../model/Blog.js");
const User = require("../model/User.js");

module.exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
}

module.exports.addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO Find User By This ID" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction({ session });
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ blog });
}

module.exports.updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            "title": title,
            "description": description,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ blog });
};

module.exports.getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id).populate('user');
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog });
}

module.exports.deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
}

module.exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.findById(userId).populate("blogs");
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user });
};
