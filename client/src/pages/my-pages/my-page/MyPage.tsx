import React from "react";
import {Route, Routes} from "react-router-dom";
import {AccountPage} from "../profile-pages/account-page/AccountPage";
import {EUrl} from "../../../enums";
import {CartPage} from "../cart-page/CartPage";
import {DeliveryPage} from "../delivery-page/DeliveryPage";
import {RegistrationPage} from "../profile-pages/registration-page/RegistrationPage";


export const MyPage: React.FunctionComponent = () => {
    return (
        <>
            <Routes>
                <Route element={<AccountPage/>} path="/"/>
                <Route element={<RegistrationPage/>} path={EUrl.registration.url}/>
                <Route element={<CartPage/>} path={EUrl.cart.url}/>
                <Route element={<DeliveryPage/>} path={EUrl.delivery.url}/>
            </Routes>
        </>
    )
}
