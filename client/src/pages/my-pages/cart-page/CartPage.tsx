import React, {useCallback, useContext, useEffect, useState} from "react"
import {CartItem} from "../../../components/CartItem";
import {useHttp} from "../../../hooks/http.hook";
import {useAuth} from "../../../hooks/auth.hook";
import {AuthContext} from "../../../context/AuthContext";
import {Loading} from "../../../components/Loading";
import {EmptyCart} from "../empty-cart-page/EmptyCart";
import {useMessage} from "../../../hooks/message.hook";
import {AuthPage} from "../profile-pages/auth-page/AuthPage";
import "./cartPage.style.css"
import {cartPageGetRequest} from "../../../requests/cart-requests/cart-page-get-request";
import {getHeader} from "../../../methods/getHeader";
import {cartPageSetCountRequest} from "../../../requests/cart-requests/cart-page-set-count-request";
import {
    cartPageDeliveryAddRequest
} from "../../../requests/cart-requests/cart-page-delivery-add-request";
import {cartPageDeleteRequest} from "../../../requests/cart-requests/cart-page-delete-request";


export const CartPage:React.FunctionComponent = () => {

    const [cartLoading, setCartLoading] = useState(true);
    const [itemsWasUpdated, setItemsWasUpdated] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const {request, loading} = useHttp();
    const { token, userId } = useContext(AuthContext);
    const message = useMessage();


    const [cartItems, setCartItems] = useState([{
        id: 0,
        price: 0,
        name: "",
        images: "[]",
        size_name: "",
        count: 0,
        max_count: 0
    }]);



    // Если пользователь выбрал вещей больше, чем есть на складе
    const [idsError, setIdsError ] = useState([-1]);

    // Обновление вещей в корзине пользователя
    const updateCartItems = () => {
        if (token && userId) {
            const getCartItems = async () => {
                setCartLoading(true);
                try {
                    return await request(cartPageGetRequest(), 'GET', null, getHeader(userId, token))
                } catch (e) {
                    message(e);
                }
            }
            getCartItems()
                .then(result => {
                    setCartItems(() => result)
                })
                .finally(()=> {
                    setCartLoading(false);
                    setItemsWasUpdated(true);
                });
        }
    }
    useEffect(()=> {
        updateCartItems();
    }, [token, userId])


    // Увеличение количества выбранных вещей
    function changePrices(itemId:number, count:number){
        changeCountRequest(itemId, count)
            .then(result => {
                if (result)
                    setCartItems((prev) => prev.map(item => {
                        const newItem = {...item};
                        if (item.id === itemId)
                            newItem.price = result.newPrice;
                        return newItem;
                    }))
            })
            .catch(e => console.log(e));
    }

    async function changeCountRequest(itemId:number, count:number){
        try {
            return await request(cartPageSetCountRequest(), 'POST', {itemId, count}, getHeader(userId!, token!))
        } catch (e) {
            message(e);
        }
    }

    async function removeItem (itemId:number) {
        try {
            await request(cartPageDeleteRequest(), 'POST', {itemId}, getHeader(userId!, token!))
                .then(()=>{
                    updateCartItems();
                })
        } catch (e) {
            console.log(e);
            message(e);
        }
    }

    useEffect(()=>{
        let itemsPrice = 0;
        cartItems.forEach((item)=>{
            itemsPrice += item.price;
        })
        setTotalPrice(()=> itemsPrice);
    }, [cartItems])

    const addDeliveryHandler = () => {
        const addDelivery = async () => {
            try {
                await request(cartPageDeliveryAddRequest(), 'POST', null, getHeader(userId!, token!))
                    .then(()=>{
                        updateCartItems();
                    })
            }
            catch (e) {
                message(e);
            }
        }

        const confirmation = window.confirm("Вы уверены, что хотите сделать заказ?")
        if (confirmation)
            addDelivery()
                .then(() => message("Заказ сделан успешно"))
    }

    const changeCountHandler = (operation:string, id:number, newCount:number = 0) => {
        if (operation === "add") {
            setCartItems(prev => prev.map(item => {
                const newItem = {...item};
                if (item.id === id) {
                    if (item.max_count >= item.count + 1) {
                        newItem.count = item.count + 1;
                        setIdsError((prev)=>prev.filter(ids => ids != item.id));
                        changePrices(item.id, newItem.count);
                    }
                    else
                        setIdsError((prev)=>[...prev, item.id]);
                }
                return newItem;
            }));
        }
        if (operation === "sub") {
            setCartItems(prev => prev.map(item => {
                const newItem = {...item};
                if (item.id === id) {
                    if (item.count > 1 ) {
                        newItem.count = item.count - 1;
                        setIdsError((prev)=>prev.filter(ids => ids != item.id));
                        changePrices(item.id, newItem.count)
                    }
                    else
                        setIdsError((prev)=>[...prev, item.id]);
                }
                return newItem;
            }));
        }
        if (operation === "input") {
            setCartItems(prev => prev.map(item => {
                const newItem = {...item};
                if (item.id === id) {
                    if (item.max_count >= newCount) {
                        newItem.count = newCount;
                        setIdsError((prev)=>prev.filter(ids => ids != item.id));
                        changePrices(item.id, newItem.count)
                    }
                    else
                        setIdsError((prev)=>[...prev, item.id]);
                }
                return newItem;
            }));
        }
    }

    if (!token)
        return <AuthPage/>
    if (!itemsWasUpdated)
        return <Loading/>
    if (cartItems.length === 0)
        return <EmptyCart/>
    return (
        <div className="main_cart_container">
            <div className="cart_container">
                <div className="cart_title">Корзина</div>
                <div className="cart_content">
                    <div className="cart_item_container">
                        {
                            cartItems.map(
                                item =>
                                    <CartItem
                                        key={item.id}
                                        cartItem={item}
                                        changeCountHandler={changeCountHandler}
                                        removeItem={removeItem}
                                        idsError={idsError}
                                    />)
                        }
                    </div>
                    <div className="cart_total">
                        <div className="total_title_price_container">
                            <div className="total_title">Итого</div>
                            <div className="total_price">{totalPrice} RUB</div>
                        </div>
                        <div className="total_btn">
                            <button onClick={addDeliveryHandler} className="btn">Заказать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
