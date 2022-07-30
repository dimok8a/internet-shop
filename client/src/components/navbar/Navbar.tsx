import React, {useEffect} from "react";
import {Link} from "react-router-dom"
import {EUrl} from "../../enums";
import "./navbar.style.css"
export const Navbar:React.FunctionComponent = () => {

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

    // TODO: Переделать на Link
    return (
        <nav>
            <div className="nav-wrapper purple darken-4">
                <ul id="nav-mobile" className="hide-on-med-and-down">
                    <li><a href={EUrl.tShirts.url} >Футболки</a></li>
                    <li><a href={EUrl.hoodies.url}>Худи</a></li>
                    <li><a href={EUrl.pants.url}>Штаны</a></li>
                    <li><a href={EUrl.polo.url}>Поло</a></li>
                </ul>
                <ul id="right_links" className="right hide-on-med-and-down">
                    <li><a className="right_link hide-on-med-and-down" href={`${EUrl.my.url}${EUrl.cart.url}`}><i className="center large material-icons">shopping_basket</i></a></li>
                    <li><a className="right_link hide-on-med-and-down" href={`${EUrl.my.url}${EUrl.delivery.url}`}><i className="center large material-icons">local_shipping</i></a></li>
                    <li className="account_link">
                        <a className="right_link hide-on-med-and-down" href={`${EUrl.my.url}`}>
                            <i className="center large material-icons">account_circle</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
