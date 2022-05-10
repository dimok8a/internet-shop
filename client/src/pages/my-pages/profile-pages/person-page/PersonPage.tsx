import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useInput} from "../../../../hooks/input.hook";
import {useMessage} from "../../../../hooks/message.hook";
import "./personPage.style.css"
import {personPageGetRequest} from "../../../../requests/profile-requests/person-page-requests/person-page-get-request";
import {getHeader} from "../../../../methods/getHeader";
import {useAuth} from "../../../../hooks/auth.hook";

export const PersonPage: React.FunctionComponent = () => {

    const name = useInput("")
    const phone = useInput("", {isPhone: true})
    const email = useInput("", {isEmpty: true, isEmail: true})
    const address = useInput("")

    const [disableFlag, setDisableFlag] = useState(true);
    const [isDataValid, setDataValid] = useState(true)

    const {request} = useHttp();
    const message = useMessage();
    const {token, userId} = useContext(AuthContext);
    const {logout} = useAuth();

    useEffect(()=> {
        const getRequest  = async () => {
            try {
                return await request(personPageGetRequest(), 'GET', null, getHeader(userId!, token!))
            } catch (e) {
                console.log(e)
            }
        }
        getRequest().then(result => {
            name.setValue(result.name || "");
            phone.setValue(result.phone_number || "");
            email.setValue(result.email);
            address.setValue(result.address || "");
        })

    }, [])

    function changeBtnHandler () {
        setDisableFlag(false);
    }

    function saveBtnHandler() {
        const changeUserData = async () => {
            try {
                return await request(personPageGetRequest(), 'POST', {
                    name: name.value,
                    phone: phone.value,
                    email: email.value,
                    address: address.value,
                }, getHeader(userId!, token!))
            } catch (e) {
                message(e);
            }
        }
        changeUserData()
            .finally(()=>document.location.reload());
        setDisableFlag(true);
    }

    useEffect(()=>{
        if (email.isValid && phone.isValid && name.isValid && address.isValid)
            setDataValid(true);
        else
            setDataValid(false);
    }, [email, phone, name, address])

    return (
        <div className="person_container container">
            <h2 className="center">Мои данные</h2>
            <div className="person_data">
                <div className="data-item data-name">Имя
                    <input disabled={disableFlag} onChange={e => name.onChange(e)} type="text" value={name.value} className="value-item name-value"/>
                </div>
                <div className="data-item data-phone">Телефон
                    <input disabled={disableFlag} onChange={e => phone.onChange(e)} type="text" value={phone.value} className="value-item phone-value"/>
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
                <button className="btn btn-large red darken-4" onClick={()=> {
                    logout();
                    window.location.reload();
                }}>Выйти</button>
            </div>
        </div>
    )
}
