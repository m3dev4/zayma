import express from "express";
import {
  deleteAccountUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  verifyEmail,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:userId", verifyEmail);

// protected routes
router.post("/logout", protect, logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteAccountUser);

// admin routes
router.get("/admin/users", protect, isAdmin, getAllUsers);
router
  .route("/admin/users/:id")
  .get(protect, isAdmin, getUserById)
  .delete(protect, isAdmin, deleteUserById);

export default router;
