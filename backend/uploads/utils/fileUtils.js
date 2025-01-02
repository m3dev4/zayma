import cloudinary from '../config/cloudinary.js';

export const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
  }
};

export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const splitUrl = url.split('/');
  return splitUrl[splitUrl.length - 1].split('.')[0];
}; 