import React from "react";
import {AdminSelector} from "../../../components/AdminSelector";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {AddItemPage} from "../add-item-page/AddItemPage";
import {RemoveItemPage} from "../remove-item-page/RemoveItemPage";

export const AdminPage: React.FunctionComponent = () => {
    return (
        <>
            <div className="container center">
                <h1>Добро пожаловать на страницу админа</h1>
                <AdminSelector/>
                <Routes>
                    <Route path="addItem" element={<AddItemPage/>}/>
                    <Route path="removeItem" element={<RemoveItemPage/>}/>
                </Routes>
            </div>
        </>

    )
}
