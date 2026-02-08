import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authentication from "../Middleware/auth.js";

const router = express.Router();




router.get("/dashboard", authentication, (req, res) => {
  res.json({
    userId: req.userId,
    userName: req.name,
    role: req.role
  });
});
  

router.post("/signup", async (req, res) => {
  try {
    const { FullName, UserName, Password, Role } = req.body;
    if (!Role || !Password) return res.status(400).json({ msg: "Role and Password required" });

    const userExists = await User.findOne({ UserName });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const user = new User({ FullName, UserName, Password, Role });
    await user.save();

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ UserName: userName });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, userName: user.UserName, role: user.Role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("logToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    res.json({ msg: "Login successful", user: { id: user._id, userName: user.UserName, role: user.Role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("logToken", { httpOnly: true, sameSite: "strict" });
  res.json({ msg: "Logout successful" });
});

export default router;