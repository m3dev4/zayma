// @desc    Créer une nouvelle boutique
// @route   POST /api/stores

import asyncHandler from "../middleware/asyncHandler.js";
import createStore from "../models/createStore.js";
import cloudinary from '../uploads/config/cloudinary.js';
import fs from 'fs';

// @desc    Créer une nouvelle boutique
// @route   POST /api/stores
// @access  Private
const createStoreHandler = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  try {
    console.log('File to upload:', req.file);
    
    // Upload vers Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'zayma/store-logos',
      transformation: [{ width: 500, height: 500, crop: 'fill' }]
    });

    // Supprimer le fichier temporaire après l'upload
    fs.unlinkSync(req.file.path);

    const store = await createStore.create({
      name,
      description,
      logo: result.secure_url,
      owner: req.user._id,
    });

    if (store) {
      res.status(201).json(store);
    } else {
      await cloudinary.uploader.destroy(result.public_id);
      throw new Error('Échec de la création de la boutique');
    }
  } catch (error) {
    // Si le fichier existe toujours, le supprimer
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400);
    throw new Error(error.message || 'Erreur lors de la création de la boutique');
  }
});

// @desc    Obtenir les détails d'une boutique
// @route   GET /api/stores/:id
// @access  Public
const getStoreById = asyncHandler(async (req, res) => {
  const store = await createStore
    .findById(req.params.id)
    .populate("owner", "firstName, lastName, email");
  if (store) {
    res.Json(store);
  } else {
    res.status(404);
    throw new Error("Boutique non trouvée");
  }
});

// @desc    Mettre à jour une boutique
// @route   PUT /api/stores/:id
// @access  Private/Owner
const updateStore = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const store = await createStore.findById(req.params.id);

  if (store) {
    // Si un nouveau logo est uploadé
    if (req.file) {
      // Supprimer l'ancien logo de Cloudinary
      const oldLogoPublicId = store.logo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(oldLogoPublicId);
      store.logo = req.file.path;
    }

    store.name = name || store.name;
    store.description = description || store.description;

    const updatedStore = await store.save();
    res.json(updatedStore);
  } else {
    if (req.file) {
      // Supprimer le fichier uploadé si la mise à jour échoue
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(404);
    throw new Error('Boutique non trouvée');
  }
});

// @desc    Supprimer une boutique
// @route   DELETE /api/stores/:id
// @access  Private/Owner
const deleteStore = asyncHandler(async (req, res) => {
  const store = await createStore.findById(req.params.id);

  try {
    if (store) {
      await store.deleteOne();
      res.json({ message: "Boutique supprimée" });
    }
  } catch (error) {
    res.status(404);
    throw new Error("Boutique non trouvée");
  }
});

// @desc    Obtenir toutes les boutiques
// @route   GET /api/stores
// @access  Public
const getStores = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const count = await createStore.countDocuments({ ...keyword });
  const stores = await createStore
    .find({ ...keyword })
    .populate("owner", "firstName, lastName")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-createdAt");

  res.json({
    stores,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Obtenir les boutiques d'un utilisateur
// @route   GET /api/stores/mystores
// @access  Private
const getMyStores = asyncHandler(async (req, res) => {
  const stores = await createStore.find({ owner: req.user._id });
  res.json(stores);
});

// @desc    Admin: Obtenir toutes les boutiques
// @route   GET /api/stores/admin/all
// @access  Private/Admin
const getAllStoresAdmin = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const stores = await createStore
    .find({})
    .populate("owner", "firstName lastName email")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-createdAt");

  const count = await createStore.countDocuments({});

  res.json({
    stores,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Admin: Obtenir les statistiques des boutiques
// @route   GET /api/stores/admin/stats
// @access  Private/Admin
const getStoreStats = asyncHandler(async (req, res) => {
  const totalStores = await createStore.countDocuments();
  const activeStores = await createStore.countDocuments({ isActive: true });
  const inactiveStores = await createStore.countDocuments({ isActive: false });
  const recentStores = await createStore
    .find({})
    .sort("-createdAt")
    .limit(5)
    .populate("owner", "firstName lastName email");

  res.json({
    totalStores,
    activeStores,
    inactiveStores,
    recentStores,
  });
});

// @desc    Admin: Activer/Désactiver une boutique
// @route   PUT /api/stores/admin/:id/toggle
// @access  Private/Admin
const toggleStoreStatus = asyncHandler(async (req, res) => {
  const store = await createStore.findById(req.params.id);

  if (store) {
    store.isActive = !store.isActive;
    const updatedStore = await store.save();
    res.json(updatedStore);
  } else {
    res.status(404);
    throw new Error("Boutique non trouvée");
  }
});

// @desc    Admin: Supprimer une boutique
// @route   DELETE /api/stores/admin/:id
// @access  Private/Admin
const adminDeleteStore = asyncHandler(async (req, res) => {
  const store = await createStore.findById(req.params.id);

  if (store) {
    await store.deleteOne();
    res.json({ message: "Boutique supprimée par l'administrateur" });
  } else {
    res.status(404);
    throw new Error("Boutique non trouvée");
  }
});

export {
  createStoreHandler,
  getStoreById,
  updateStore,
  deleteStore,
  getStores,
  getMyStores,
  getAllStoresAdmin,
  getStoreStats,
  toggleStoreStatus,
  adminDeleteStore,
};
