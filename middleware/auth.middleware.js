const UsersDatabase = require('../db/UsersDatabase')

const db = new UsersDatabase();

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const id = req.headers.authorization.split(" ")[1];
        const token = req.headers.authorization.split(" ")[2];

        if (!id || !token){
            return res.status(401).json({message: "Пользователь не авторизован"})
        }
        const user = await db.getUserById(id);
        if (user.token === token) {
            req.user = user;
            return next();
        }
        return res.status(401).json({message: "Пользователь не авторизован"})
    } catch (e) {
        return res.status(500).json({message: "Произошла ошибка. Повторите позднее"})
    }
}
