import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {ErrorPage} from "../error-page/ErrorPage";
import {Item} from "../../components/Item";
import {Loading} from "../../components/loading/Loading";
import "./itemPage.style.css"
import {itemPageRequest} from "../../requests/item-requests/item-page-request";
import {cartRequest} from "../../requests/item-requests/cart-request";
import {getHeader} from "../../methods/getHeader";
import {AuthContext} from "../../context/AuthContext";
import {IClotheData} from "../../interfaces";

export const ItemPage: React.FunctionComponent = () => {
    const params = useParams()
    const {loading, request} = useHttp()
    const { token, userId } = useContext(AuthContext);
    const [sizesInCart, setSizesInCart] = useState([]);
    const [data, setData] = useState<IClotheData>();

    useEffect(()=> {
        // Задаем размеры, которые уже лежат в корзине
        (async () => {
            if (token && userId) {
                setSizesInCart(await request(cartRequest(params['*']), 'GET', null, getHeader(userId!, token!)));
            }
        })();
        (async () => {
            setData(await request(itemPageRequest(params.id)))
        })();
    }, []);

    // Выводим загрузку компонента
    if (loading)
        return <Loading/>
    // Если вещь существует, то возвращаем ее
    if (data)
        return <Item sizesInCart={sizesInCart} data={data}/>
    else
        return <ErrorPage/>

}
