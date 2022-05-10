class Clothes {
    constructor(db) {
        this.db = db;
    }
}

class TShirts extends Clothes {
    constructor (db) {
        super(db);
        this.type = 't-shirts'
    }
}

class Hoodies extends Clothes {
    constructor (db) {
        super(db);
        this.type = 'hoodies'
    }
}

class Pants extends Clothes {
    constructor (db) {
        super(db);
        this.type = 'pants'
    }
}

class Polo extends Clothes {
    constructor (db) {
        super(db);
        this.type = 'polo'
    }
}

class ClotheFactory {
    static clotheList = {
        "t-shirts": TShirts,
        "hoodies": Hoodies,
        "pants": Pants,
        "polo": Polo
    }

    static isExists = function (type) {
        return !!ClotheFactory.clotheList[type];
    }

    create (db, type) {
        const Clothe = ClotheFactory.clotheList[type]
        const clothe = new Clothe(db);
        clothe.sendAllClothes = function (response) {
            clothe.db.getAllClothesWithPrices(clothe.type).then(result => response.json({data: result}))
        }
        clothe.sendClothe = function (id, response) {
            clothe.db.getClotheByIdWithPriceAndSizes(clothe.type, id)
                .then(result => {
                    response.json({data: result})
                })
                .catch(()=>response.status(400).json({message: "Одежда не найдена"}))
        }
        return clothe;
    }
}

module.exports = ClotheFactory;
