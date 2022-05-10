import React from "react";
import {IClotheDelivery} from "../interfaces";
import {EDeliveryStatusColor} from "../enums";

export const DeliveryItem: React.FunctionComponent<{deliveryItem: IClotheDelivery, cancelDeliveryHandler: any}> = (props) => {
    const {deliveryItem, cancelDeliveryHandler} = {...props}
    const imageSrc = window.location.origin + "/" + deliveryItem.image;
    const statusColor = EDeliveryStatusColor[deliveryItem.status];
    return (
        <div className="delivery_item">
            <div className="delivery_item_left">
                <div className="delivery_img">
                    <img src={`${imageSrc}/S`}/>
                </div>
                <div className="delivery_data">
                    <div className="delivery_name">{deliveryItem.name}</div>
                    <div className="delivery_details">{deliveryItem.size_name}</div>
                </div>
            </div>
            <div className="delivery_count">
                {deliveryItem.count} шт
            </div>
            <div className="delivery_price">{deliveryItem.price} RUB</div>
            <div className="delivery_right">
                <div className="delivery_status" style={{color: statusColor}}>{deliveryItem.status}</div>
                {deliveryItem.status === "Доставляется" && <button className="delivery_btn" onClick={()=>cancelDeliveryHandler(deliveryItem.id)}>Отменить</button>}
            </div>

        </div>
    )
}
