import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Vérifier que les variables sont définies
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Variables d\'environnement Cloudinary manquantes');
  console.log('CLOUDINARY_CLOUD_NAME:', CLOUDINARY_CLOUD_NAME);
  console.log('CLOUDINARY_API_KEY:', CLOUDINARY_API_KEY);
  console.log('CLOUDINARY_API_SECRET:', CLOUDINARY_API_SECRET);
  throw new Error('Configuration Cloudinary incomplète');
}

// Configurer Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export default cloudinary; 