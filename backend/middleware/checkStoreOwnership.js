import createStore from "../models/createStore.js"


const checkOwnership = async (req, res, next) => {
    try {
        const store = await createStore.findById(req.params.id)
        if (!store) {
            return res.status(404).json({ message: ' Boutique non trouvée'})
        }
        if (store.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Non autorisé' })
        }
        req.store = store
        next()
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur'})
    }
}

export default checkOwnership