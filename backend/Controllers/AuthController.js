const jwt = require("jsonwebtoken");
const UserModels = require("../Models/User.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModels.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, You can login",
        success: false,
      });
    }

    // Create new user
    const newUser = new UserModels({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10); // Hash password before saving
    await newUser.save();

    res
      .status(201)
      .json({ message: "Signup successfully done", success: true });
  } catch (error) {
    console.error("Signup error:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModels.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Invalid email or password", success: false });
    }

    const isEqual = await bcrypt.compare(password, existingUser.password);
    if (!isEqual) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    const jwtToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Login Sucess",
      success: true,
      jwtToken,
      email,
      name: existingUser.name,
    });
  } catch (error) {
    // console.error("Login error:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

module.exports = {
  signup,
  login,
};
