const User = require("../model/User.js");
const bcrypt = require("bcryptjs");

module.exports.getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
};

module.exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(password, 6);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ user });
};

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "Could not Find User By This Email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login Successful", user: existingUser });
};
