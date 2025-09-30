import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};


const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // hashing a password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error); // 👈 will log exact issue in backend terminal
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checks if the email is already registered or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User Not found" });
        }

        // compare the typed password and the password create during the registration
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        // create a token, if the password matches then create a JWT token for the user for next time
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.status(200).json({ accessToken, refreshToken, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token required' });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid refresh token' });

            const newAccessToken = generateAccessToken(decoded.id);
            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


export const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(400).json({ error: 'Invalid token' });

        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // req.user is set by authMiddleware
    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};