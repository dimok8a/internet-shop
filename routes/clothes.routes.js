const {Router} = require("express");
const Database = require("../db/Database");
const ClotheFactory = require('../db/ClotheFactory')
const router = Router();

const db = new Database();
const clotheFactory = new ClotheFactory();

router.get('/:clotheType', async(req, res)=> {
    const clotheType = req.params.clotheType;
    const result = await db.getAllClothes(clotheType);
    if (result)
        res.status(200).json(result);
    else {
        res.status(400).json({message: "Одежда не найдена"})
    }
})

router.get('/getClothe/:id', async(req, res)=>{
    const id = req.params.id;
    const result = await db.getClotheById(id);
    if (result)
        res.status(200).json(result);
    else {
        res.status(400).json({message: "Одежда не найдена"})
    }
})

module.exports = router;
