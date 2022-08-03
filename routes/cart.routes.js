const {Router} = require("express");
const CartsDatabase = require("../db/CartsDatabase");
const router = Router();
const auth = require("../middleware/auth.middleware")

const db = new CartsDatabase();

router.get('/', auth, async (req, res)=> {
    try {
        const result = await db.getUserCartItems(req.user.id);
        result.forEach(item => item.price *= item.count)
        return  res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.post('/setCount', auth, async (req, res) => {
    try {
        await db.changeItemCount(req.user.id, req.body.id, req.body.newCount);
        const result = (await db.getItemById(req.body.id))[0];
        result.price *= result.count;
        return  res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.post('/delete', auth, async (req, res) => {
    try {
        const {itemId} = req.body;
        await db.deleteItemFromCart(itemId);
        return res.status(200).json({
            message: "Ok"
        })
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.post('/add', auth, async (req, res) => {
    try {
        const {productId, sizeId} = req.body;
        await db.addItemInCart(productId, sizeId, req.user.id);
        return res.status(200).json({message: "Ok"})
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {

        const clotheId = req.params.id;
        const result = await db.getItemInCart(clotheId, req.user.id);
        if (result.sizes)
            return res.status(200).json(result.sizes.split(", "))
        return res.status(200).json([]);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})





module.exports = router;
