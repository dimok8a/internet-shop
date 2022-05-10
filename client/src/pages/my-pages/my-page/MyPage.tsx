import React from "react";
import {Route, Routes} from "react-router-dom";
import {AccountPage} from "../profile-pages/account-page/AccountPage";
import {EUrl} from "../../../enums";
import {CartPage} from "../cart-page/CartPage";
import {DeliveryPage} from "../delivery-page/DeliveryPage";


export const MyPage: React.FunctionComponent = () => {
    return (
        <>
            <Routes>
                <Route element={<AccountPage/>} path="/*"/>
                <Route element={<AccountPage/>} path={EUrl.account.url}/>
                <Route element={<CartPage/>} path={EUrl.cart.url}/>
                <Route element={<DeliveryPage/>} path={EUrl.delivery.url}/>
            </Routes>
        </>
    )
}
