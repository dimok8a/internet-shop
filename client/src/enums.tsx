import {IUrl} from "./interfaces";

export enum ESize {
    XS,
    S,
    M,
    L,
    XL,
    XXL,
    XXXL
}

export enum EClotheType {
    "TShirt",
    "hoodie",
    "pants",
    "polo"
}

export const EDeliveryStatusColor: { [id: string]: string } = {
    "Доставляется": "#ee964b",
    "Доставлено": "grey",
    "Отменен": "red",
    "Ожидает получения": "green",
    "Ошибка": "red"
}

export const EUrl: { [id: string] : IUrl} = {
    main : {url: "/*", text: "Главная"},
    tShirts : {url: "/t-shirts", text: "Футболки"},
    hoodies : {url: "/hoodies", text: "Худи"},
    pants : {url: "/pants", text: "Штаны"},
    polo : {url: "/polo", text: "Поло"},
    account : {url: "/account", text: "Мой аккаунт"},
    registration : {url: "/registration", text: "Регистрация"},
    my : {url: "/my", text: "Мой аккаунт"},
    cart : {url: "/cart", text: "Моя корзина"},
    delivery : {url: "/delivery", text: "Товары в доставке"},
    admin : {url: "/admin", text: "Админ панель"}
}
