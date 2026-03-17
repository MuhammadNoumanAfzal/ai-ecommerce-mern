const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables.");
}

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
        id: user._id,
        email: user.email,
          role: user.role,
          username: user.username

        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({
      success: true,
      message: "Logout successful" });
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};




module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware 
};
