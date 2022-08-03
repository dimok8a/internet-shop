import React, {useContext, useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import "./RegistrationAuth.style.css"
import {useMessage} from "../../../../hooks/message.hook";
import {authPageLoginRequest} from "../../../../requests/profile-requests/auth-page-requests/auth-page-login-request";
import {authPageRegisterRequest} from "../../../../requests/profile-requests/auth-page-requests/auth-page-register-request";
import {Link, useNavigate} from "react-router-dom";
import {EUrl} from "../../../../enums";
import {AuthContext} from "../../../../context/AuthContext";
const md5 = require("md5");
export const AuthPage: React.FunctionComponent = () => {

    const {request} = useHttp();
    const {userId, token, login, logout} = useContext(AuthContext);
    const message = useMessage();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        phone: "",
        password: ""
    })

    const changeHandler = (e:any) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const loginHandler = async () => {
        const randNum = Math.floor(Math.random()*10000).toString();
        const newForm = {
            phone: form.phone,
            hash: md5(md5(form.phone+form.password)+randNum),
            rand: randNum
        }
        try {
            const data = await request(authPageLoginRequest(), 'POST', {...newForm})
            navigate(EUrl.tShirts.url);
            login(data.token, data.id);
            message(`Добро пожаловать, ${data.name}`)
        } catch (e) {
            console.log(e);
            message((e as Error).message);
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
        <div className="auth__container">
            <div className="authorization">
                <div id="auth__title">Авторизация</div>
                <div className="login__container">
                    <div className="login">
                        <div className="login__cont">
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Номер телефона (через 8)</span>
                                <input
                                    type="tel"
                                    id="log"
                                    name="phone"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input_container"
                                 onFocus={onFocusHandler}
                                 onBlur={onBlurHandler}
                            >
                                <span>Пароль</span>
                                <input
                                    type="password"
                                    id="pass"
                                    name="password"
                                    onChange={changeHandler}
                                />
                            </div>
                            <button
                                id="btnLogin"
                                onClick={loginHandler}
                            >Войти</button>
                        </div>
                    </div>
                    <div className="logout hide">
                        <div className="logout__container hide">
                            <button id="btnLogout">Выйти</button>
                        </div>
                    </div>
                    <div id="registr_container">
                        <Link to={'.' + EUrl.registration.url} id="registr_link">Регистрация</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
