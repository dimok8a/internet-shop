const Database = require("../db/Database");

const db = new Database();

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {

        const id = req.headers.authorization.split(" ")[1];
        const token = req.headers.authorization.split(" ")[2];

        if (!id || !token){
            return res.status(401).json({message: "Пользователь не авторизован"})
        }
        db.doesUserExists(id, token)
            .then(user => {
                if (user) {
                    req.user = user;
                    return next();
                }
        })
            .catch(e => {
                return res.status(500).json({message: "Произошла ошибка. Повторите позднее"})
            })

    } catch (e) {
        return res.status(500).json({message: "Пользователь не авторизован"})
    }
}
