import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({ success: false, message: "User already Exists." });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Register User Successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't Exists" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      process.env.CLIENT_SECRET,
      {
        expiresIn: "60m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};

const checkAuth = (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated User", user });
};

export { register, login, checkAuth };
