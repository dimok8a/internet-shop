import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {EUrl} from "../../enums";
import "./navbar.style.css"
export const Navbar:React.FunctionComponent = () => {

    const [active, setActive] = useState(false);

    // Подсвечивает выбранный пункт
    useEffect(()=>{
        const links = document.querySelector('nav')!.querySelectorAll('a');
        links.forEach((link)=>{
            if (window.location.href === link.href)
                link.classList.add('active');
            else
                link.classList.remove('active');
        })
    }, [])

    function onClickHandler(e:any) {
        const links = document.querySelector('nav')!.querySelectorAll('a');
        links.forEach((link)=>{
            link.classList.remove('active');
        })
        e.target.classList.add('active');
    }

    useEffect(() => {
        if (active) {
            document.querySelector('.burger_menu')!.querySelector('svg')!.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#FFF;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="cross"><line class="cls-1" x1="7" x2="25" y1="7" y2="25"/><line class="cls-1" x1="7" x2="25" y1="25" y2="7"/></g></svg>`
            document.querySelector('.burger_menu_body')!.classList.add('active');
            document.body.style.position = 'fixed';
        } else {
            document.querySelector('.burger_menu')!.querySelector('svg')!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24"><path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/></svg>`;
            document.querySelector('.burger_menu_body')!.classList.remove('active');
            document.body.style.position = '';
        }
    }, [active])

    function onClickBurgerMenuHandler(e:any) {
        setActive(!active);
    }

    function onClickBurgerMenuBodyHandler(e:any) {
        if (e.target.tagName === 'A') {
            document.querySelector('.burger_menu_body')!.classList.remove('active');
            setActive(false);
        }
    }

    return (
        <>
            <div className="burger_menu">
                <svg onClick={onClickBurgerMenuHandler} xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24"><path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/></svg>
            </div>
            <div className="burger_menu_body" onClick={onClickBurgerMenuBodyHandler}>
                <div className="point"><Link to={EUrl.tShirts.url} onClick={onClickHandler}>Футболки</Link></div>
                <div className="point"><Link to={EUrl.hoodies.url} onClick={onClickHandler}>Худи</Link></div>
                <div className="point"><Link to={EUrl.pants.url} onClick={onClickHandler}>Штаны</Link></div>
                <div className="point"><Link to={EUrl.polo.url} onClick={onClickHandler}>Поло</Link></div>
                <div className="down_body">
                    <div className="point"><Link to={`${EUrl.my.url}${EUrl.cart.url}`} onClick={onClickHandler}>Корзина</Link></div>
                    <div className="point"><Link to={`${EUrl.my.url}${EUrl.delivery.url}`} onClick={onClickHandler}>Заказы</Link></div>
                    <div className="point"><Link to={`${EUrl.my.url}`} onClick={onClickHandler}>Личный кабинет</Link></div>
                </div>
            </div>
            <nav>
                <div className="main_links">
                    <div className="point"><Link to={EUrl.tShirts.url} onClick={onClickHandler}>Футболки</Link></div>
                    <div className="point"><Link to={EUrl.hoodies.url} onClick={onClickHandler}>Худи</Link></div>
                    <div className="point"><Link to={EUrl.pants.url} onClick={onClickHandler}>Штаны</Link></div>
                    <div className="point"><Link to={EUrl.polo.url} onClick={onClickHandler}>Поло</Link></div>
                </div>
                <div className="right_links">
                    <div className="point"><Link to={`${EUrl.my.url}${EUrl.cart.url}`} onClick={onClickHandler} className="right_link hide-on-med-and-down"><i className="center large material-icons">shopping_basket</i></Link></div>
                    <div className="point"><Link to={`${EUrl.my.url}${EUrl.delivery.url}`} onClick={onClickHandler} className="right_link hide-on-med-and-down"><i className="center large material-icons">local_shipping</i></Link></div>
                    <div className="point"><Link to={`${EUrl.my.url}`} onClick={onClickHandler} className="right_link hide-on-med-and-down">
                        <i className="center large material-icons">account_circle</i>
                    </Link></div>
                </div>
            </nav>
        </>

    )
}
