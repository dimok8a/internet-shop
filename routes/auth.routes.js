const {check, validationResult } = require('express-validator')
const {Router} = require("express");
const router = Router();
const DataBase = require('../db/Database')
const md5 = require("md5")
const auth = require('../middleware/auth.middleware')

const db = new DataBase()
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
        check('email', 'Некорректный email').isEmail()
    ],
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

            const {email, hash, rand} = req.body;
            const candidate = await db.getUserByEmail(email);
            if (!candidate)
                return res.status(400).json(
                    {
                            message: "Неправильный пароль"
                    })

            return res.status(500).json({message: "Ошибка при авторизации"})
                // if (candidate) {
                //     if (hash === md5(candidate.hash + rand)){
                //         const token = md5(Date.now().toString() + Math.random()*12323231);
                //         db.setTokenById(candidate.id, token)
                //             .then(() => {
                //                 return res.json({token, id: candidate.id})
                //             })
                //             .catch(()=> {
                //                     return res.status(500).json({message: "Ошибка при авторизации"})
                //                 }
                //             )
                //         return;
                //     }
                //     return res.status(400).json({
                //         message: "Неправильный пароль"
                //     })
                //
                // }
                // return res.status(400).json ({
                //     message: "Пользователя с таким email не существует"
                // })


        } catch (e){
            console.log(e.message);
            return res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            })
        }

})

// Существует ли юзер с переданным id и токеном
router.post('/exists',
    [],
    (req, res)=>{
    try {

        const {id, token} = req.body;

        db.doesUserExists(id, token)
            .then((user)=> user ?
                res.status(200).json({message: "OK"}) :
                res.status(400).json({message: "Пользователь не найден"}))
            .catch(e => res.status(400).json({message: "Пользователь не найден"}))
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "Что-то пошло не так, попробуйте снова"
        })
    }
    })

router.post('/change',
    [
        check('email', 'Некорректный email').isEmail(),
        check('email', "Пустой email").exists()
    ],
    auth,
    (req, res) =>
    {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }

            const {name, email, phone, address} = req.body;
            db.getUserByEmail(req.user.email).then(newUser => {
                if (newUser && newUser.id !== req.user.id) return res.status(400).json({message: "Такой пользователь уже существует"})
                db.changeUserDataById(req.user.id, name, email, phone, address)
                    .then(()=>res.status(200).json({message: "Данные обновлены успешно"}))
                    .catch(()=> res.status(500).json({message: "Что-то пошло не так, попробуйте снова"}))
            })
            .catch(()=>res.status(400).json({message: "Пользователь не найден"}))

        } catch (e){
            console.log(e.message);
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова"
            })
        }
    })

router.get('/userData', auth, async (req, res) => {
    try {
        if (req.user) {
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


module.exports = router;
