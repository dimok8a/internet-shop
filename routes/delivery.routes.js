const {Router} = require("express");
const DeliveriesDatabase = require("../db/DeliveriesDatabase");
const router = Router();
const auth = require("../middleware/auth.middleware")
const db = new DeliveriesDatabase();

router.get('/', auth, async (req, res)=> {
    try {
        const result = await db.getUserDeliveryItems(req.user.id);
        result.forEach(item => item.price *= item.count)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.post('/add', auth, async (req, res) => {
    try {
        await db.addCartItemsInDelivery(req.user.id);
        await db.removeCartItems(req.user.id);
        return res.status(200).json({message: "Ok"})
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }


})

router.post('/cancel', auth, async (req, res) => {
    try {
        const {itemId} = req.body;
        await db.changeStatus(itemId, 4);
        return res.status(200).json({
            message: "Ok"
        })
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }

})







module.exports = router;
