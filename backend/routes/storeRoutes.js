import express from "express";

import {
  createStoreHandler,
  deleteStore,
  getStoreById,
  getStores,
  updateStore,
  getAllStoresAdmin,
  getStoreStats,
  toggleStoreStatus,
  adminDeleteStore,
} from "../controllers/storeController.js";
import checkOwnership from "../middleware/checkStoreOwnership.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadStoreLogo } from "../uploads/middlewares/uploadMiddleware.js";

const router = express.Router();

// Routes publiques et utilisateur
router
  .route("/")
  .post(protect, uploadStoreLogo, createStoreHandler)
  .get(getStores);
router
  .route("/:id")
  .get(getStoreById)
  .put(protect, checkOwnership, uploadStoreLogo, updateStore)
  .delete(protect, checkOwnership, deleteStore);

// Routes admin
router.get("/admin/all", protect, isAdmin, getAllStoresAdmin);
router.get("/admin/stats", protect, isAdmin, getStoreStats);
router.put("/admin/:id/toggle", protect, isAdmin, toggleStoreStatus);
router.delete("/admin/:id", protect, isAdmin, adminDeleteStore);

export default router;
