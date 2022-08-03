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

    function onClickHandler(e:any) {
        const links = document.querySelector('nav')!.querySelectorAll('a');
        links.forEach((link)=>{
            link.classList.remove('active');
        })
        e.target.classList.add('active');
    }

    // TODO: Переделать на Link
    return (
        <nav>
            <div className="nav-wrapper purple darken-4">
                <ul id="nav-mobile" className="hide-on-med-and-down">
                    <li><Link to={EUrl.tShirts.url} onClick={onClickHandler}>Футболки</Link></li>
                    <li><Link to={EUrl.hoodies.url} onClick={onClickHandler}>Худи</Link></li>
                    <li><Link to={EUrl.pants.url} onClick={onClickHandler}>Штаны</Link></li>
                    <li><Link to={EUrl.polo.url} onClick={onClickHandler}>Поло</Link></li>
                </ul>
                <ul id="right_links" className="right hide-on-med-and-down">
                    <li><Link to={`${EUrl.my.url}${EUrl.cart.url}`} onClick={onClickHandler} className="right_link hide-on-med-and-down"><i className="center large material-icons">shopping_basket</i></Link></li>
                    <li><Link to={`${EUrl.my.url}${EUrl.delivery.url}`} onClick={onClickHandler} className="right_link hide-on-med-and-down"><i className="center large material-icons">local_shipping</i></Link></li>
                    <li className="account_link">
                        <Link to={`${EUrl.my.url}`} onClick={onClickHandler} className="right_link hide-on-med-and-down">
                            <i className="center large material-icons">account_circle</i>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
