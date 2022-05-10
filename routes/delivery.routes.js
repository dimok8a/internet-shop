const {Router} = require("express");
const Database = require("../db/Database");
const router = Router();
const auth = require("../middleware/auth.middleware")
const db = new Database();

router.get('/', auth, (req, res)=> {
    try {
        db.getUserDeliveryItems(req.user.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(e => res.status(500).json({message: "Что-то пошло не так, попробуйте снова"}))
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.post('/add', auth, (req, res) => {
    try {
        db.addCartItemsInDelivery(req.user.id)
            .then(() => {
                return res.status(200).json({message: "OK"})
            })
            .catch(()=>res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            }))
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }


})

router.post('/cancel', auth, (req, res) => {
    try {
        const {itemId} = req.body;
        db.cancelDeliveryItem(req.user.id, itemId)
            .then(() =>res.status(200).json({message: "OK"}))
            .catch(()=>res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            }))
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }

})







module.exports = router;
