const {Router} = require("express");
const Database = require("../db/Database");
const ClotheFactory = require('../db/ClotheFactory')
const router = Router();

const db = new Database();
const clotheFactory = new ClotheFactory();

router.get('/:clotheType', (req, res)=> {
    const clotheType = req.params.clotheType;
    if (ClotheFactory.isExists(clotheType)){
        const clothe = clotheFactory.create(db, clotheType);
        clothe.sendAllClothes(res);
        return;
    }
    res.status(400).json({message: "Одежда не найдена"})
})

router.get('/:clotheType/:id', (req, res)=>{
    const clotheType = req.params.clotheType;
    const id = req.params.id;

    if (ClotheFactory.isExists(clotheType)){
        const clothe = clotheFactory.create(db, clotheType);
        clothe.sendClothe(id, res);
        return;
    }
    res.status(400).json({message: "Одежда не найдена"})
})

module.exports = router;