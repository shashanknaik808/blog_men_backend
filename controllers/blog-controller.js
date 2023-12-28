const mongoose = require("mongoose");
const Blog = require("../model/Blog.js");
const User = require("../model/User.js");

module.exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
<<<<<<< HEAD
    } catch (err) {
=======
    }
    catch (err) {
>>>>>>> 56f3b181884358ac453bd32a00d21ab1a5e0fd45
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
}

<<<<<<< HEAD

module.exports.addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO Find User By This ID" });
    }
=======
module.exports.addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    }
    catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO Find User By This ID" });
    }

>>>>>>> 56f3b181884358ac453bd32a00d21ab1a5e0fd45
    const blog = new Blog({
        title,
        description,
        image,
<<<<<<< HEAD
        user,
=======
        user
>>>>>>> 56f3b181884358ac453bd32a00d21ab1a5e0fd45
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction({ session });
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
<<<<<<< HEAD
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
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
        return console.log(err);
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
        return console.log(err);
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
        console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
}

=======
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({ blog })
};

module.exports.updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }
    catch (err) {
        return console.log(err);
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
    }
    catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog });
};

module.exports.deleteBlog = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(500).jspn({ message: "Unable To Delete" })
    }
    return res.status(200).json({ message: "Successfully Deleted" })
};
>>>>>>> 56f3b181884358ac453bd32a00d21ab1a5e0fd45

module.exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    //console.log(userId);
    let user;
    try {
        user = await User.findById(userId).populate("blogs");
        console.log(user);
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user });
};