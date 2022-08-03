import React, {useContext, useEffect, useState} from "react";
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
import {IClotheDelivery} from "../../../interfaces";

export const DeliveryPage:React.FunctionComponent = () => {
    const { token, userId } = useContext(AuthContext);
    const message = useMessage();
    const {request, loading} = useHttp();
    const [itemsWasUpdated, setItemsWasUpdated] = useState(false);

    const [deliveryItems, setDeliveryItems] = useState<IClotheDelivery[]>([]);

    // Обновление вещей в доставке пользователя
    const updateDeliveryItems = async() => {
        if (token && userId) {
            setItemsWasUpdated(false);
            try {
                const deliveryItems = await request(deliveryPageGetRequest(), 'GET', null, getHeader(userId, token))
                setDeliveryItems(deliveryItems)
            } catch (e) {
                message((e as Error).message);
            } finally {
                setItemsWasUpdated(true);
            }
        }
    }

    const cancelDeliveryHandler = async (itemId: number) => {
        const confirmation = window.confirm("Вы уверены, что хотите отменить заказ?")
        if (confirmation) {
            await request(deliveryPageCancelRequest(), 'POST', {itemId}, getHeader(userId!, token!));
            await updateDeliveryItems();
            message("Заказ успешно отменен")
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
