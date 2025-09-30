import jwt from "jsonwebtoken";
import User from "../models/User.js";

// export const authMiddleware = (req, res, next) => {
//   try {
//     // Get token from Authorization header
//     const authHeader = req.header("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Access denied. No token provided." });
//     }

//     // Extract token
//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user info to request
//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     return res.status(403).json({ error: "Invalid or expired token." });
//   }
// };


export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};