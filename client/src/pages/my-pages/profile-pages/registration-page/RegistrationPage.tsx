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
            hash: md5(form.phone+form.password)
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

    function onFocusHandler(e:any) {
        e.target.closest('div').classList.add('focused')
    }

    function onBlurHandler(e:any) {
        if (!e.target.value)
            e.target.closest('div')!.classList.remove('focused')
    }
    return (
        <div className="reg__container">
            <div className="registration">
                <div id="reg__title">Регистрация</div>
                <div className="registr__container">
                    <div className="registr">
                        <div className="registr__cont">

                            <label htmlFor="mail"> {errors.email}</label>
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Укажите вашу электронную почту</span>
                            <input
                                type="text"
                                id="mail"
                                name="email"
                                onChange={changeHandler}
                            />
                        </div>
                            <label htmlFor="name"> {errors.name}</label>
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Укажите ваше имя</span>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                 onChange={changeHandler}
                            />
                            </div>
                            <label htmlFor="phone"> {errors.phone}</label>
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Укажите ваш номер телефона (через 8)</span>
                            <input
                                type="tel"
                                id="log"
                                name="phone"
                                 onChange={changeHandler}
                            />
                            </div>
                            <label htmlFor="address"> {errors.address}</label>
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Укажите ваш адресс</span>
                            <input
                                type="text"
                                id="log"
                                name="address"
                                 onChange={changeHandler}
                            />
                            </div>
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Придумайте пароль</span>
                            <input
                                type="password"
                                id="pass1"
                                name="password"
                                 onChange={changeHandler}
                            />
                            </div>
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
