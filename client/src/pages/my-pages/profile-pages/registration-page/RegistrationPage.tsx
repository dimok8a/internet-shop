import React, {useState} from "react";
import {
    authPageRegisterRequest
} from "../../../../requests/profile-requests/auth-page-requests/auth-page-register-request";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../../hooks/auth.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import {EUrl} from "../../../../enums";
const md5 = require("md5");

interface IInputError {
    email: string,
    name: string,
    phone: string,
    address: string
}

interface IServerError {
    message: string,
    errors?: IInputError
}

const initialInputError = {
    email: "",
    name: "",
    phone: "",
    address: ""
}

export const RegistrationPage: React.FunctionComponent = () => {
    const {login} = useAuth();
    const message = useMessage();
    const {request} = useHttp();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        address: ""
    })
    const [errors, setErrors] = useState<IInputError>(initialInputError)
    const changeHandler = (e:any) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const registerHandler = async () => {
        const newForm = {
            ...form,
            hash: md5(form.email+form.password)
        }
        // @ts-ignore
        delete newForm.password
        try {
            const data = await request(authPageRegisterRequest(), 'POST', {...newForm})
            login(data.token, data.id);
            navigate(EUrl.tShirts.url);
            message("Регистрация прошла успешно!")
        } catch (e) {
            const err = e as IServerError;
            if (err.errors)
                setErrors(err.errors)
            else
                setErrors(initialInputError)
            message(err.message)
        }


    }
    return (
        <div className="reg__container">
            <div className="registration">
                <div id="reg__title">Регистрация</div>
                <div className="registr__container">
                    <div className="registr">
                        <div className="registr__cont">
                            <label htmlFor="mail"> {errors.email}</label>
                            <input
                                type="text"
                                placeholder="Укажите вашу электронную почту"
                                id="mail"
                                name="email"
                                onChange={changeHandler}
                            />
                            <label htmlFor="name"> {errors.name}</label>
                            <input
                                type="text"
                                placeholder="Укажите ваше имя"
                                id="name"
                                name="name"
                                 onChange={changeHandler}
                            />
                            <label htmlFor="phone"> {errors.phone}</label>
                            <input
                                type="tel"
                                placeholder="Укажите ваш номер телефона"
                                id="log"
                                name="phone"
                                 onChange={changeHandler}
                            />
                            <label htmlFor="address"> {errors.address}</label>
                            <input
                                type="text"
                                placeholder="Укажите ваш адресс"
                                id="log"
                                name="address"
                                 onChange={changeHandler}
                            />
                            <input
                                type="password"
                                placeholder="Придумайте пароль"
                                id="pass1"
                                name="password"
                                 onChange={changeHandler}
                            />
                            <input
                                type="password"
                                placeholder="Повторите пароль"
                                id="pass2"
                            />
                            <button
                                id="btnRegistr"
                                onClick={registerHandler}
                            >Зарегистрироваться</button>
                        </div>
                    </div>
                    <div id="auth_container">
                        <Link to="../" id="auth_link">Авторизация</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
