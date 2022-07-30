import React, {useContext, useEffect, useState} from "react";
import {CartItem} from "../../../components/CartItem";
import {DeliveryItem} from "../../../components/DeliveryItem";
import {AuthContext} from "../../../context/AuthContext";
import {useMessage} from "../../../hooks/message.hook";
import {useHttp} from "../../../hooks/http.hook";
import {Loading} from "../../../components/loading/Loading";
import "./deliveryPage.style.css"
import {EmptyDelivery} from "../empty-delivery-page/EmptyDelivery";
import {AuthPage} from "../profile-pages/auth-page/AuthPage";
import {deliveryPageGetRequest} from "../../../requests/delivery-requests/delivery-page-get-request";
import {getHeader} from "../../../methods/getHeader";
import {deliveryPageCancelRequest} from "../../../requests/delivery-requests/delivery-page-cancel-request";

export const DeliveryPage:React.FunctionComponent = () => {
    const { token, userId } = useContext(AuthContext);
    const message = useMessage();
    const {request, loading} = useHttp();
    const [itemsWasUpdated, setItemsWasUpdated] = useState(false);

    const [deliveryItems, setDeliveryItems] = useState([{
        id: 0,
        price: 0,
        name: "",
        image: "",
        size_name: "",
        count: 0,
        status: ""
    }]);

    // Обновление вещей в доставке пользователя
    const updateDeliveryItems = () => {
        if (token && userId) {
            setItemsWasUpdated(false);
            const getCartItems = async () => {
                try {
                    return await request(deliveryPageGetRequest(), 'GET', null, getHeader(userId, token))
                } catch (e) {
                    message(e);
                }
            }
            getCartItems()
                .then(result => {
                    setDeliveryItems(() => result)
                })
                .finally(()=>setItemsWasUpdated(true))
        }
    }

    const cancelDeliveryHandler = (itemId: number) => {
        const cancelDelivery = async () => {
            try {
                return await request(deliveryPageCancelRequest(), 'POST', {itemId}, getHeader(userId!, token!))
            } catch (e) {
                message(e);
            }
        }
        const confirmation = window.confirm("Вы уверены, что хотите отменить заказ?")
        if (confirmation) {
            cancelDelivery().finally(()=>document.location.reload())
        }
    }

    useEffect(()=> {
        updateDeliveryItems();
    }, [token, userId])

    if (!token)
        return <AuthPage/>
    if (!itemsWasUpdated)
        return <Loading/>
    if (deliveryItems.length === 0)
        return <EmptyDelivery/>
    return (
        <div className="main_delivery_container">
            <div className="delivery_container">
                <div className="delivery_title">Заказы</div>
                <div className="delivery_content">
                    {
                        deliveryItems.map(item =>
                        <DeliveryItem
                            key={item.id}
                            deliveryItem={item}
                            cancelDeliveryHandler={cancelDeliveryHandler}
                        />)
                    }
                </div>
            </div>
        </div>
    )
}
