import React, {useCallback, useEffect, useState} from "react";
import {IClotheCart} from "../interfaces";
import {BASE_URL} from "../constants/baseUrl";

export const CartItem:React.FunctionComponent<{cartItem: IClotheCart, changeCountHandler:any, removeItem: any, idsError:number[]}> = (props) => {
    const item = props.cartItem;
    const changeCountHandler = props.changeCountHandler;
    const idsError = props.idsError;
    const removeItem = props.removeItem;
    const imageSrc = BASE_URL + "/" + JSON.parse(item.images)[0];

    const [isMouseOver, setMouseOver] = useState(false);

    return (
        <div className="cart_item">
            <div className="cart_item_left">
                <div className="cart_img">
                    <img src={`${imageSrc}/S`}/>
                </div>
                <div className="cart_data">
                    <div className="cart_name">{item.name}</div>
                    <div className="cart_details">{item.size_name}</div>
                </div>
            </div>
            <div
                onMouseLeave={()=> setMouseOver(false)}
                onMouseOver={()=> setMouseOver(true)}
                className="cart_count"
            >
                <div className="cart_count_selector">
                    <button
                        disabled={item.count === 1}
                        onClick={()=>changeCountHandler("sub", item.id)}
                        className="cart_count_btn cart_count_btn_sub"
                    />
                    <input
                        className="cart_count_value"
                        onChange={(e)=>changeCountHandler('input', item.id, parseInt(e.target.value) || 1)}
                        value={item.count}
                    />
                    <button
                        disabled={item.count === item.max_count}
                        onClick={()=>changeCountHandler("add", item.id)}
                        className="cart_count_btn cart_count_btn_add"
                    />
                </div>
                { isMouseOver &&
                    <button
                        onClick={() => removeItem(item.id)}
                        className="cart_delete_btn">Удалить из корзины</button>
                }
                {idsError.includes(item.id) && <div className="cart_count_danger">Осталось: {item.max_count} шт. </div>}
            </div>
            <div className="cart_price">{item.price} RUB</div>
        </div>)
}
