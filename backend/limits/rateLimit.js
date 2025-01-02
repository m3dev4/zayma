import { rateLimit } from 'express-rate-limit'

const createStoreLimiter = rateLimit({
    window: 24 * 60 * 60 * 1000, // 24 heures
    max: 1, //Limite à 1 de boutique par IP
    message: 'Trop de tentative de création de boutique, veuillez réessayer plus tard'
})

export default createStoreLimiter