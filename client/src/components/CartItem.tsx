import React, {useCallback, useEffect, useState} from "react";
import {IClotheCart} from "../interfaces";
import {BASE_URL} from "../constants/baseUrl";
import { Loader } from "./loader/Loader";

export const CartItem:React.FunctionComponent<{cartItem: IClotheCart, changeCountHandler:any, removeItem: any, idsError:number[], loadingId: number}> = (props) => {
    const item = props.cartItem;
    const changeCountHandler = props.changeCountHandler;
    const idsError = props.idsError;
    const removeItem = props.removeItem;
    const loadingId = props.loadingId;

    const [isMouseOver, setMouseOver] = useState(false);
    const [count, setCount] = useState(item.count+"");

    function changeInputCountHandler(e:any) {
        if (parseInt(e.target.value) <= 0)
            setCount(0+"")
        if (parseInt(e.target.value) > item.max_count) {
            setCount(item.max_count + "")
        }
        if (e.target.value === "" || (parseInt(e.target.value) <= item.max_count && parseInt(e.target.value) > 0))
            setCount(e.target.value);

    }

    useEffect(() => {
        setCount(item.count+"");
    }, [item])

    return (
        <div className="cart_item">
            <div className="cart_item_left">
                <div className="cart_img">
                    <img src={`${BASE_URL}/${item.image}/S`} alt={item.name}/>
                </div>
                <div className="cart_data">
                    <div className="cart_name">{item.name}</div>
                    <div className="cart_details">{item.size}</div>
                </div>
            </div>
            <div
                onMouseLeave={()=> setMouseOver(false)}
                onMouseOver={()=> setMouseOver(true)}
                className="cart_count"
            >
                {
                    loadingId === item.id? <Loader/> : (
                    <div className="cart_count_selector">
                    <button
                    disabled={item.count === 1}
                    onClick={()=>changeCountHandler(item.id, item.count-1)}
                    className="cart_count_btn cart_count_btn_sub"
                    />
                    <input
                    className="cart_count_value"
                    onChange={changeInputCountHandler}
                    onBlur={(e)=>changeCountHandler(item.id, parseInt(count) || 1)}
                    value={count}
                    />
                    <button
                    disabled={item.count === item.max_count}
                    onClick={()=>changeCountHandler(item.id, item.count+1)}
                    className="cart_count_btn cart_count_btn_add"
                    />
                    </div>
                    )
                }
                { isMouseOver &&
                    <button
                        onClick={() => removeItem(item.id)}
                        className="cart_delete_btn">Удалить из корзины</button>
                }
                {idsError.includes(item.id) && <div className="cart_count_danger">Осталось: {item.max_count} шт. </div>}
            </div>
            {
                loadingId === item.id
                ? <Loader/>
                :  <div className="cart_price">{item.price} RUB</div>
            }
        </div>)
}
