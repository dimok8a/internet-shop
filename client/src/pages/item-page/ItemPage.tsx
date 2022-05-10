import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {ErrorPage} from "../error-page/ErrorPage";
import {Item} from "../../components/Item";
import {Loading} from "../../components/Loading";
import "./itemPage.style.css"
import {itemPageRequest} from "../../requests/item-requests/item-page-request";
import {cartRequest} from "../../requests/item-requests/cart-request";
import {getHeader} from "../../methods/getHeader";
import {AuthContext} from "../../context/AuthContext";

export const ItemPage: React.FunctionComponent = () => {
    const params = useParams()
    const {loading, request} = useHttp()
    const [componentDidMount, setComponentDidMount] = useState(false);
    const { token, userId } = useContext(AuthContext);
    const [sizesInCart, setSizesInCart] = useState([]);
    const [data, setData] = useState({
        name: "",
        structure: [{"":0}],
        price: 0,
        sizes: [
            {name: "", count:0, id:0}
        ],
        images: [],
        description: "",
        id: 0,
        product_type_id: 0
    });

    const [exists, setExists] = useState(true);


    const fetchData = async ()=>{
        try {
            const body = await request(itemPageRequest(params['*']))
            return body.data;
        } catch (e) {
            throw e;
        }
    }

    useEffect(()=>{
        const fetchCart = async () => {
            if (token && userId) {
                const result = await request(cartRequest(params['*']), 'GET', null, getHeader(userId!, token!));
                return result;
            }
        }
        fetchCart().then(sizes => {
            if (sizes)
                setSizesInCart(() => sizes)
        });
    }, [token, userId])

    useEffect(()=>{
        fetchData()
            .then(
                data => {
                    setExists(()=>!!data);
                    setData(()=>({...data, structure: [JSON.parse(data.structure)], images: JSON.parse(data.images)}));
                }
            )
            .catch(
                (e)=> {
                    console.log(e);
                    setExists(false)
                }
            )
            .finally(()=>setComponentDidMount(true))
    }, []);

    // Выводим загрузку компонента
    if (loading || !componentDidMount)
        return <Loading/>
    // Если вещь существует, то возвращаем ее
    if (exists)
        return <Item sizesInCart={sizesInCart} data={data}/>
    else
        return <ErrorPage/>

}
