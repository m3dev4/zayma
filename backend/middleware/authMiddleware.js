import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  let token;

  token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log("JWT Verification Failed:", error.message);
      res.status(401).send("Invalid Token");
    }
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user)
    return res.status("401").json({ message: "Authentication required" });
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Access Forbiden Admin Only" });
  }
};

export { authenticate, isAdmin };
