import React, {useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {authPageLoginRequest} from "../../../../requests/profile-requests/auth-page-requests/auth-page-login-request";
import {authPageRegisterRequest} from "../../../../requests/profile-requests/auth-page-requests/auth-page-register-request";
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
            message(e);
        }

    }

    const registerHandler = async () => {
        const newForm = {
            email: form.email,
            hash: md5(form.email+form.password)
        }
        try {
            const data = await request(authPageRegisterRequest(), 'POST', {...newForm})
            login(data.token, data.id);
            message(data.message)
            document.location.reload();
        } catch (e) {
            message(e)
        }

    }

    return (
        <div className={"row"}>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title center">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введите email"
                                       id="email"
                                       type="text"
                                       name="email"
                                       className="validate yellow-input"
                                       onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="validate yellow-input"
                                       onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn deep-purple darken-4"
                            style={{marginRight : 10}}
                            // disabled={loading}
                            onClick={loginHandler}
                        >Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            // disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
