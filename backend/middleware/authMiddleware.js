import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Vérifier le header Authorization
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Vérifier aussi le cookie si nécessaire
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("Non autorisé - Pas de token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    res.status(401);
    throw new Error("Non autorisé - Token invalide");
  }
});

const isAdmin = (req, res, next) => {
  if (!req.user)
    return res.status("401").json({ message: "Authentication required" });
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Access Forbiden Admin Only" });
  }
};

export { protect, isAdmin };
