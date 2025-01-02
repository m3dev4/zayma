
# Documentation du Système de Gestion de Boutiques Zayma

## Table des matières
1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [API Reference](#api-reference)
6. [Gestion des Images](#gestion-des-images)
7. [Sécurité](#sécurité)
8. [Exemples d'utilisation](#exemples-dutilisation)

## Introduction

Le système de gestion de boutiques Zayma permet aux utilisateurs de créer et gérer leur boutique en ligne. Chaque utilisateur est limité à une seule boutique, avec la possibilité de personnaliser son profil commercial via un logo et des informations détaillées.

### Caractéristiques principales
- Création et gestion de boutiques
- Upload et gestion de logos
- Système de slugs automatiques pour les URLs
- Interface d'administration
- Gestion des droits d'accès
- Intégration avec Cloudinary pour le stockage d'images

## Architecture

### Structure des dossiers
```
backend/
├── controllers/
│   └── storeController.js
├── models/
│   └── createStore.js
├── uploads/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middlewares/
│   │   └── uploadMiddleware.js
│   └── utils/
│       └── fileUtils.js
└── middleware/
    ├── authMiddleware.js
    └── checkStoreOwnership.js
```zayma/docs/STORE_MANAGEMENT.md

### Modèle de données
```javascript
const storeSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50
  },
  description: {
    type: String,
    required: true,
    maxLength: 500
  },
  logo: {
    type: String,
    required: true
  },
  link: {
    type: String,
    unique: true
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  isActive: Boolean,
  createdAt: Date
}
```

## Installation

1. Cloner le repository
```bash
git clone [repo-url]
cd zayma
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
```

## Configuration

### Variables d'environnement requises
```env
# Server Configuration
PORT=8080
MONGO_URI=votre_uri_mongodb

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# JWT Configuration
JWT_SECRET=votre_jwt_secret
```

### Configuration Cloudinary
La configuration de Cloudinary est gérée dans `uploads/config/cloudinary.js` :
```javascript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

## API Reference

### Endpoints publics

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/stores | Liste des boutiques |
| GET | /api/stores/:id | Détails d'une boutique |

### Endpoints authentifiés

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/stores | Créer une boutique |
| PUT | /api/stores/:id | Modifier une boutique |
| DELETE | /api/stores/:id | Supprimer une boutique |

### Endpoints administrateur

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/stores/admin/all | Liste toutes les boutiques |
| GET | /api/stores/admin/stats | Statistiques des boutiques |
| PUT | /api/stores/admin/:id/toggle | Active/désactive une boutique |

## Gestion des Images

### Configuration Upload
- Formats supportés : jpg, jpeg, png, webp
- Taille maximale : 2MB
- Stockage : Cloudinary
- Redimensionnement automatique : 500x500px

### Exemple d'upload
```javascript
// Dans Thunder Client/Postman
POST /api/stores
Content-Type: multipart/form-data

name: "Ma Boutique"
description: "Description de ma boutique"
logo: [FILE]
```

## Sécurité

### Middleware d'authentification
Toutes les routes protégées utilisent le middleware `authenticate` :
```javascript
router.use(authenticate);
```

### Vérification de propriété
Le middleware `checkOwnership` vérifie que l'utilisateur est propriétaire de la boutique :
```javascript
router.put('/:id', authenticate, checkOwnership, updateStore);
```

## Exemples d'utilisation

### Créer une boutique
```javascript
// Request
POST /api/stores
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Ma Boutique",
  "description": "Description détaillée",
  "logo": [File]
}

// Response
{
  "success": true,
  "data": {
    "id": "store_id",
    "name": "Ma Boutique",
    "link": "ma-boutique",
    "logo": "https://cloudinary.com/..."
  }
}
```

### Modifier une boutique
```javascript
// Request
PUT /api/stores/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Nouveau nom",
  "description": "Nouvelle description"
}
```

### Bonnes pratiques
1. Toujours vérifier le token d'authentification
2. Valider les entrées utilisateur
3. Gérer proprement les erreurs
4. Nettoyer les fichiers temporaires
5. Vérifier les permissions utilisateur
```

Cette documentation devrait vous aider à comprendre et à utiliser efficacement le système de gestion de boutiques. Voulez-vous que je continue avec le message de commit ?
