import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration du stockage pour les logos de boutique
const storeLogoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'zayma/store-logos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }]
  }
});

// Configuration de base de multer
const upload = multer({
  storage: storeLogoStorage,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('Format de fichier non supporté'), false);
    }
    cb(null, true);
  }
});

// Middleware pour l'upload de logo avec gestion d'erreur intégrée
export const uploadStoreLogo = (req, res, next) => {
  upload.single('logo')(req, res, (err) => {
    console.log('Upload attempt:', {
      body: req.body,
      file: req.file,
      error: err
    });

    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'Fichier trop volumineux (max 2MB)'
          });
        }
      }
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
};

// Middleware de debug simplifié
export const debugRequest = (req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    contentType: req.headers['content-type'],
    body: req.body,
    files: req.files || req.file
  });
  next();
}; 