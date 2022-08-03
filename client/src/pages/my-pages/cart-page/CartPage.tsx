import React, {useCallback, useContext, useEffect, useState} from "react"
import {CartItem} from "../../../components/CartItem";
import {useHttp} from "../../../hooks/http.hook";
import {useAuth} from "../../../hooks/auth.hook";
import {AuthContext} from "../../../context/AuthContext";
import {Loading} from "../../../components/loading/Loading";
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
import {Loader} from "../../../components/loader/Loader";


export const CartPage:React.FunctionComponent = () => {

    const [itemsWasUpdated, setItemsWasUpdated] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const {request, loading} = useHttp();
    const { token, userId } = useContext(AuthContext);
    const message = useMessage();
    const [loadingId, setLoadingId] = useState(0);


    const [cartItems, setCartItems] = useState([{
        id: 0,
        price: 0,
        name: "",
        image: "",
        size: "",
        count: 0,
        max_count: 0
    }]);



    // Если пользователь выбрал вещей больше, чем есть на складе
    const [idsError, setIdsError ] = useState([-1]);

    // Обновление вещей в корзине пользователя
    const updateCartItems = () => {
        setItemsWasUpdated(false)
        if (token && userId) {
            const getCartItems = async () => {
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
                    setItemsWasUpdated(true);
                });
        }
    }
    useEffect(()=> {
        updateCartItems();
    }, [token, userId])


    async function removeItem (itemId:number) {
        try {
            await request(cartPageDeleteRequest(), 'POST', {itemId}, getHeader(userId!, token!))
            updateCartItems();
            message("Вещь успешно удалена из корзины")
        } catch (e) {
            console.log(e);
            message((e as Error).message);
        }
    }

    useEffect(()=>{
        let itemsPrice = 0;
        cartItems.forEach((item)=>{
            itemsPrice += item.price;
        })
        setTotalPrice(()=> itemsPrice);
    }, [cartItems])

    const addDeliveryHandler = async() => {
        const confirmation = window.confirm("Вы уверены, что хотите сделать заказ?")
        if (confirmation) {
            try {
                await request(cartPageDeliveryAddRequest(), 'POST', null, getHeader(userId!, token!))
                updateCartItems();
                message("Заказ создан успешно")
            }
            catch (e) {
                message((e as Error).message);
            }
        }
    }



    const changeCountHandler = async (id:number, newCount:number = 0) => {
        setLoadingId(id);
        const result = await request(cartPageSetCountRequest(), 'POST', {id, newCount}, getHeader(userId!, token!))
        setCartItems(prev => prev.map(item => {
            return {...item, price: item.id === result.id ? result.price : item.price, count: item.id === result.id ? result.count : item.count}
        }))
        setLoadingId(0);
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
                                        loadingId={loadingId}
                                    />)
                        }
                    </div>
                    <div className="cart_total">
                        <div className="total_title_price_container">
                            <div className="total_title">Итого</div>
                            {loading ? <Loader/>
                            : <div className="total_price">{totalPrice} RUB</div>
                            }
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
