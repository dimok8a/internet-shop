import React, {useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import "./RegistrationAuth.style.css"
import {useMessage} from "../../../../hooks/message.hook";
import {authPageLoginRequest} from "../../../../requests/profile-requests/auth-page-requests/auth-page-login-request";
import {authPageRegisterRequest} from "../../../../requests/profile-requests/auth-page-requests/auth-page-register-request";
import {Link} from "react-router-dom";
import {EUrl} from "../../../../enums";
const md5 = require("md5");
export const AuthPage: React.FunctionComponent = () => {

    const {request} = useHttp();
    const {login} = useAuth();
    const message = useMessage();

    const [form, setForm] = useState({
        email: "",
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
            email: form.email,
            hash: md5(md5(form.email+form.password)+randNum),
            rand: randNum
        }
        try {
            const data = await request(authPageLoginRequest(), 'POST', {...newForm})
            login(data.token, data.id);
            message(data.message)
            document.location.reload();
        } catch (e) {
            message((e as Error).message);
        }

    }


    return (
        <div className="auth__container">
            <div className="authorization">
                <div id="auth__title">Авторизация</div>
                <div className="login__container">
                    <div className="login">
                        <div className="login__cont">
                            <input
                                type="email"
                                placeholder="E-mail"
                                id="log"
                                name="email"
                                onChange={changeHandler}
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                id="pass"
                                name="password"
                                onChange={changeHandler}
                            />
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
