import React from "react";
import {Navbar} from "../../components/navbar/Navbar";
import {Route, Routes} from "react-router-dom"
import {ErrorPage} from "../error-page/ErrorPage";
import {ClothesPage} from "../clothes-page/ClothesPage";
import {EUrl} from "../../enums";
import {HomePage} from "../home-page/HomePage";
import {ItemPage} from "../item-page/ItemPage";
import {MyPage} from "../my-pages/my-page/MyPage";

export const MainPage: React.FunctionComponent = () => {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route element={<HomePage/>} path=""/>
                <Route element={<MyPage/>} path={EUrl.my.url+"/*"}/>
                <Route element={<ClothesPage clotheData={EUrl.tShirts}/>} path={EUrl.tShirts.url}/>
                <Route element={<ItemPage/>} path={`${EUrl.tShirts.url}/:id`}/>
                <Route element={<ClothesPage clotheData={EUrl.hoodies}/>} path={EUrl.hoodies.url}/>
                <Route element={<ItemPage/>} path={`${EUrl.hoodies.url}/:id`}/>
                <Route element={<ClothesPage clotheData={EUrl.pants}/>} path={EUrl.pants.url}/>
                <Route element={<ItemPage/>} path={`${EUrl.pants.url}/:id`}/>
                <Route element={<ClothesPage clotheData={EUrl.polo}/>} path={EUrl.polo.url}/>
                <Route element={<ItemPage/>} path={`${EUrl.polo.url}/:id`}/>
                {/*<Route element={<ErrorPage/>}/>*/}
            </Routes>
        </>
    )
}
