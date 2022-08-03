import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useInput} from "../../../../hooks/input.hook";
import {useMessage} from "../../../../hooks/message.hook";
import "./personPage.style.css"
import {personPageGetRequest} from "../../../../requests/profile-requests/person-page-requests/person-page-get-request";
import {getHeader} from "../../../../methods/getHeader";
import {useAuth} from "../../../../hooks/auth.hook";
import {
    personPageChangeRequest
} from "../../../../requests/profile-requests/person-page-requests/person-page-change-request";
import {
    personPageExitRequest
} from "../../../../requests/profile-requests/person-page-requests/person-page-exit-request";
import {EUrl} from "../../../../enums";
import {useNavigate} from "react-router-dom";


let defaultValues = {
    name: "",
    phone_number: "",
    'e-mail': "",
    address: ""
}
export const PersonPage: React.FunctionComponent = () => {

    const name = useInput("")
    const email = useInput("", {isEmpty: true, isEmail: true})
    const address = useInput("")
    const [phone, setPhone] = useState("");


    const [disableFlag, setDisableFlag] = useState(true);
    const [isDataValid, setDataValid] = useState(true)

    const {request} = useHttp();
    const message = useMessage();
    const {token, userId} = useContext(AuthContext);
    const {logout} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        const getRequest  = async () => {
            try {
                return await request(personPageGetRequest(), 'GET', null, getHeader(userId!, token!))
            } catch (e) {
                document.location.reload();
                message((e as Error).message);
            }
        }
        getRequest().then(result => {
            name.setValue(result.name || "");
            email.setValue(result['e-mail'] || "");
            address.setValue(result.address || "");
            setPhone(result.phone_number || "");
            defaultValues = result;
        })
    }, [])

    function changeBtnHandler () {
        setDisableFlag(false);
    }

    async function saveBtnHandler() {
        const changeUserData = async () => {
            return await request(personPageChangeRequest(), 'POST', {
                name: name.value,
                email: email.value,
                address: address.value,
            }, getHeader(userId!, token!))
        }
        try {
            await changeUserData();
            defaultValues.name = name.value;
            defaultValues['e-mail'] = email.value;
            defaultValues.address = address.value;
            message("Изменения сохранены успешно")
        } catch (e) {
            name.setValue(defaultValues.name || "");
            email.setValue(defaultValues['e-mail'] || "");
            address.setValue(defaultValues.address || "");
            message((e as Error).message)
        }
        setDisableFlag(true);
    }

    useEffect(()=>{
        if (email.isValid && name.isValid && address.isValid)
            setDataValid(true);
        else
            setDataValid(false);
    }, [email, name, address])

    async function exitBtnHandler() {
        const changeUserData = async () => {
            return await request(personPageExitRequest(), 'POST', null, getHeader(userId!, token!))
        }
        try {
            await changeUserData();
            message("Вы вышли из системы");
            logout();
            navigate(EUrl.tShirts.url);
        } catch (e) {
            message((e as Error).message);
        }
    }

    return (
        <div className="person_container container">
            <h2 className="center">Мои данные</h2>
            <div className="person_data">
                <div className="data-item data-name">Имя
                    <input disabled={disableFlag} onChange={e => name.onChange(e)} type="text" value={name.value} className="value-item name-value"/>
                </div>
                <div className="data-item data-phone">Телефон
                    <input disabled={true} type="text" value={phone} className="value-item phone-value"/>
                </div>
                <div className="data-item data-email">Почта
                    <input disabled={disableFlag} onChange={e => email.onChange(e)} type="email" value={email.value} className="value-item email-value"/>
                </div>
                <div className="data-item data-address">Адрес
                    <input disabled={disableFlag} onChange={e => address.onChange(e)} type="text" value={address.value} className="value-item address-value"/>
                </div>
            </div>
            <div className={(disableFlag?" ":"hide ") + " center"}>
                <button className="btn btn-large" onClick={changeBtnHandler}>Изменить информацию</button>
            </div>
            <div className={(disableFlag?"hide":" ") + " center"}>
                <button disabled={!isDataValid} className="btn btn-large" onClick={saveBtnHandler}>Сохранить</button>
            </div>
            <div className={(disableFlag?" ":"hide ") + " center exit_btn"}>
                <button className="btn btn-large red darken-4" onClick={exitBtnHandler}>Выйти</button>
            </div>
        </div>
    )
}
