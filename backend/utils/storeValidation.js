import { body, validationResult } from 'express-validator'


exports.validateStor = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ max: 50 })
        .withMessage('Le nom ne peut pas dépasser 50 caractere '),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('le description est requise')
        .isLength({ max: 500 })
        .withMessage('La description ne peut pas dépasser 500 caractères'),

    body('logo')
        .notEmpty()
        .withMessage('Le logo est requis')
        .isURL()
        .withMessage('le logo doit être une url valide'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]