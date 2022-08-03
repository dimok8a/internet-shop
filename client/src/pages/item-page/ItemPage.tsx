import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {ErrorPage} from "../error-page/ErrorPage";
import {Loading} from "../../components/loading/Loading";
import "./itemPage.style.css"
import {itemPageRequest} from "../../requests/item-requests/item-page-request";
import {cartRequest} from "../../requests/item-requests/cart-request";
import {getHeader} from "../../methods/getHeader";
import {AuthContext} from "../../context/AuthContext";
import {IClotheData} from "../../interfaces";
import {EUrl} from "../../enums";
import {useMessage} from "../../hooks/message.hook";
import {itemRequest} from "../../requests/item-requests/item-request";

export const ItemPage: React.FunctionComponent = () => {
    const params = useParams()
    const {loading, request} = useHttp()
    const { token, userId } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [sizesInCart, setSizesInCart] = useState([0]);
    const [itemUpdated, setItemUpdated] = useState(false);
    const [data, setData] = useState<IClotheData>({
        name: "",
        price: 0,
        sizes : [{id: 0, name: "", count:0}],
        images: [""],
        description: "",
        id: 0
    });
    const message = useMessage();
    const [mainPhoto, setMainPhoto] = useState("");
    const [selectSize, setSelectSize] = useState({
        name: data.sizes[0].name,
        count: data.sizes[0].count,
        id: data.sizes[0].id
    })


    const changeMainPhotoHandler = (event:any) => {
        setMainPhoto(prev => event.target.src ? event.target.src : prev);
    }

    function getSizeCountAndId(sizeName:string):number[]{
        for (let i = 0; i<data.sizes.length; i++)
            if (data.sizes[i].name === sizeName)
                return [data.sizes[i].count, data.sizes[i].id]
        return [];
    }

    const selectItemHandler = (event:any) => {
        const sizeName = event.target.value;
        const [count, id] = getSizeCountAndId(sizeName);
        setSelectSize({
            name: sizeName,
            count,
            id
        })
    }

    async function addItem() {
        try {
            await request(itemRequest(), 'POST',
                {
                    productId: data.id,
                    sizeId: selectSize.id
                }, getHeader(userId!, token!))
            await updateItem();
            message("Успешно добавлено в корзину")
        } catch (e) {
            message((e as Error).message);
        }

    }

    async function updateItem() {
        try {
            const data = await request(itemPageRequest(params.id));
            if (data) {
                setData(data)
                setMainPhoto("../" + data.images[0]);
                setSelectSize({
                    name: data.sizes[0].name,
                    count: data.sizes[0].count,
                    id: data.sizes[0].id}
                )
                // Задаем размеры, которые уже лежат в корзине
                if (token && userId) {
                    console.log(token, userId);
                    const sizes = await request(cartRequest(params['*']?.split("/")[1]), 'GET', null, getHeader(userId!, token!));
                    if (sizes)
                        setSizesInCart(sizes);
                }
            }
        } catch(e) {
            console.log(e);
                setError(true);
            }
        finally {
            setItemUpdated(true);
        }
    }

    useEffect(()=> {
            updateItem();
    }, []);

    // Выводим загрузку компонента
    if (loading || !itemUpdated)
        return <Loading/>
    if (error)
        return <ErrorPage/>
    return (
        <div className="grid_wrapper">
            <div onClick={changeMainPhotoHandler} className="sidebar">
                {
                    data.images.map((src, ind) => <img key={ind} src={"../" + src}/>)
                }
            </div>
            <div className="item_image" style={{ backgroundImage: `url(${mainPhoto}` }}/>
            <div className="right_menu">
                <div className="item_opts">
                    <div className="item_name">{data.name}</div>
                    <div className="item_description">{data.description}</div>
                    <div className="item_price">{data.price} RUB</div>
                    <select onChange={selectItemHandler} className="item_select" name="size">
                        <option disabled>Выберите размер товара</option>
                        {
                            data.sizes.map(sizeCount => {
                                if (sizeCount.name){
                                    return <option key={sizeCount.id} value={sizeCount.name}>{sizeCount.name}</option>
                                }
                            })
                        }
                    </select>
                    <div className="item_availability">В наличии: {selectSize.count} шт.</div>
                    {!!token &&
                    (sizesInCart.includes(selectSize.id) ?
                        <button
                            className="btn item_btn"
                            disabled
                            onClick={() => addItem()}
                        >
                            Уже в корзине
                        </button>
                        :
                        <button
                            className="btn item_btn"
                            onClick={() => addItem()}
                        >
                            Добавить в корзину
                        </button>)
                    }
                    {!token &&
                        <Link to={EUrl.my.url}>Чтобы добавить в корзину, войдите или зарегистрируйтесь</Link>
                    }
                </div>
            </div>
        </div>
    )

}
