const {check, validationResult, oneOf} = require('express-validator')
const {Router} = require("express");
const router = Router();
const md5 = require("md5")
const auth = require('../middleware/auth.middleware')
const UsersDatabase = require('../db/UsersDatabase')

const db = new UsersDatabase();
router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('name', 'Некорректное имя').exists(),
        check('name', 'Некорректное имя').isLength({min: 3}),
        check('phone', 'Некорректный номер телефона').isLength({min: 11, max:11}).isNumeric(),
        check('address', 'Некорректный адресс').isLength({min: 5}),
    ],
    async (req, res) =>
    {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                // error messages to {error : msg}
                let mapErrors = errors.mapped();
                for (let mapErrorsKey in mapErrors) {
                    mapErrors[mapErrorsKey] = mapErrors[mapErrorsKey].msg
                }
                return res.status(400).json({
                    errors: mapErrors,
                    message: "Некорректные данные при регистрации"
                })
            }

            const {email, name, phone, address, hash} = req.body;
            const candidate = await db.getUserByEmailOrNumber(email, phone);
            if (candidate)
                if (candidate.phone_number === phone)
                    return res.status(400).json ({
                        message: "Пользователь с таким номер телефона уже существует"
                    })
                else
                    return res.status(400).json ({
                        message: "Пользователь с таким e-mail уже существует"
                    })
            const token = md5(Date.now().toString() + Math.random()*12323231);
            const id = await db.registerUser(email, name, phone, address, hash, token);
            if (id) {
                return res.status(200).json ({
                    id, token
                })
            }
            return res.status(500).json({
                message: "Ошибка при регистрации"
            })
        } catch (e){
            console.log(e.message);
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            })
        }
    })

router.post('/login',
        [
            check('phone', 'Некорректный номер телефона').isLength({min: 11, max:11}).isNumeric()
        ]
    ,
    async (req, res) =>
    {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при авторизации"
                })
            }
            const {phone, hash, rand} = req.body;
            const candidate = await db.getUserByPhone(phone);
            if (candidate) {
                if (hash === md5(candidate.hash + rand)) {
                    const token = md5(Date.now().toString() + Math.random()*12323231);
                    await db.loginUser(phone, token);
                    return res.status(200).json ({
                        id: candidate.id,
                        token,
                        name: candidate.name
                    })
                }
                return res.status(400).json({
                            message: "Неправильный пароль"
                        })
            }
            return res.status(400).json(
                {
                    message: "Пользователя с таким e-mail или номером телефона не существует"
                })
        } catch (e){
            console.log(e.message);
            return res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            })
        }

})

// Существует ли юзер с переданным id и токеном
router.post('/exists',
    auth,
    async (req, res) => {
        return res.status(200).json({message: "Ok"})
    }
)

router.post('/change',
    [
        check('email', 'Некорректный email').isEmail(),
        check('name', 'Некорректное имя').exists(),
        check('name', 'Некорректное имя').isLength({min: 3}),
        check('address', 'Некорректный адресс').isLength({min: 5}),
    ],
    auth,
    async (req, res) =>
    {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные"
                })
            }
            const {name, email, address} = req.body;
            const userByEmail = await db.getUserByEmail(email);
            if (userByEmail && userByEmail.id !== req.user.id) return res.status(400).json({message: "Пользователь с таким e-mail уже существует"})
            await db.changeUserData(req.user.id, name, email, address);
            return res.status(200).json({message: "Ok"})
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            })
        }
    })

router.get('/userData', auth, async (req, res) => {
    try {
        if (req.user) {
            delete req.user.hash
            return res.json(req.user);
        }
        return res.status(400).json({
            message: "Пользователь не найден"
        })
    } catch (e) {
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

router.post('/exit', auth, async (req, res) => {
    try {
        if (req.user) {
            await db.userExit(req.user.id);
            return res.status(200).json({message: "Ok"})
        }
        return res.status(400).json({
            message: "Пользователь не найден"
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
})

module.exports = router;
