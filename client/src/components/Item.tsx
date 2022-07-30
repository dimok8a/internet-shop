import React, {useContext, useEffect, useState} from "react";
import {IClotheData} from "../interfaces";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {ESize, EUrl} from "../enums";
import {useMessage} from "../hooks/message.hook";
import {itemRequest} from "../requests/item-requests/item-request";

export const Item: React.FunctionComponent<{ data: IClotheData, sizesInCart: number[] }> = (props) => {
    const data = props.data;
    const sizesInCart = props.sizesInCart;
    document.title = data.name;
    const { token, userId } = useContext(AuthContext);
    const {request} = useHttp();
    const message = useMessage();
    const [mainPhoto, setMainPhoto] = useState("")
    const [selectSize, setSelectSize] = useState({
        name: "",
        count: 0,
        id: 0
    })
    const changeMainPhotoHandler = (event:any) => {
        setMainPhoto(prev => event.target.src ? event.target.src : prev);
    }
    useEffect(()=>{
        if (data.images.length) {
            setMainPhoto("../" + data.images[0])
        }
        setSelectSize({
            name: data.sizes[0].name,
            count: data.sizes[0].count,
            id: data.sizes[0].id
        })
    }, [data]);

    function getSizeCountAndId(sizeName:string):number[]{
        for (let i = 0; i<data.sizes.length; i++){
            if (data.sizes[i].name === sizeName){
                return [data.sizes[i].count, data.sizes[i].id]
            }
        }
        return [];
    }

    const selectItemHandler = (event:any) => {
        const sizeName = event.target.value;
        const [count, id] = getSizeCountAndId(sizeName);
        setSelectSize((prev)=> (
            {
                name: sizeName,
                count,
                id
            }))
    }

    async function addItem() {
        try {
            await request(itemRequest(), 'POST',
        {
                token,
                id: userId,
                productId: data.id,
                sizeId: selectSize.id
            },
        {
                Authorization: `Bearer ${userId} ${token}`
            })
            document.querySelector('.item_btn')!.innerHTML = 'Добавлено';
            (document.querySelector('.item_btn')! as HTMLButtonElement).disabled = true;
        } catch (e) {
            message(e);
        }

    }

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
                        sizesInCart.includes(selectSize.id) ?
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
                        </button>
                    }
                    {!token &&
                    <a href={EUrl.my.url}>Чтобы добавить в корзину, войдите или зарегистрируйтесь</a>
                    }
                </div>
            </div>
        </div>
    )
}
