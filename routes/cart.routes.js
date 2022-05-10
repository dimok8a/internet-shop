const {Router} = require("express");
const Database = require("../db/Database");
const router = Router();
const auth = require("../middleware/auth.middleware")
const db = new Database();

router.get('/', auth, (req, res)=> {
    try {
        db.getUserCartItems(req.user.id)
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

router.post('/setCount', auth, (req, res) => {
    try {
        const { itemId, count } = req.body;
        db.changeItemCount(itemId, count)
            .then(() => {
                db.getItemPrice(itemId).then(price => {
                    res.json({newPrice: price*count})
                })
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

router.post('/delete', auth, (req, res) => {
    try {
        const {itemId} = req.body;
        db.deleteUserItem(req.user.id, itemId)
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

router.post('/add', auth, (req, res) => {
    try {
        const {productTypeId, productId, sizeId} = req.body;
        db.addCartItemInCart(req.user.id, productTypeId, productId, sizeId)
            .then(() => res.status(200).json({message: "OK"}))
            .catch(()=> res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            }))
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.get('/:clotheType/:id', auth, (req, res) => {
    try {
        const clotheType = req.params.clotheType;
        const id = parseInt(req.params.id);
        db.getItemInUserCart(req.user.id, clotheType, id)
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





module.exports = router;
