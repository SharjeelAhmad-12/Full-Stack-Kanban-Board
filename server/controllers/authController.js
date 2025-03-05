const UserModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully", user: newUser });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        next(error);
    }
};

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found" });

        const otp = Math.floor(1000 + Math.random() * 9000); 

        await UserModel.findByIdAndUpdate(user._id, { otp }, { new: true });

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "otp for Password Reset",
            text: `Your otp is: ${otp}`
        });

        res.status(200).json({ message: "otp Sent to Email" });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, password,otp } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "User Not Found" });
        if (Number(otp) !== user.otp) return res.status(400).json({ message: "Invalid OTP" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword, otp: null });

        res.status(200).json({ message: "Password Updated Successfully" });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; 

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = { signup, login, forgetPassword, resetPassword,changePassword };
