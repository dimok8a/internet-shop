import React from "react";
import {IClothe} from "../interfaces";
import {Link} from "react-router-dom";

export const ClotheCard:React.FunctionComponent<{ clothe: IClothe }> = (props) => {
    const clothe = props.clothe;
    return (
            <Link to={clothe.id.toString()} className="clothe_card">
                <div className="clothe_card_cover">
                    <div className="card-image">
                        <img src={`${clothe.image}/M`}/>
                    </div>
                    <div className="card-price">
                        {clothe.price} RUB
                    </div>
                    <div className="card-name">
                        <p>{clothe.name}</p>
                    </div>
                </div>
            </Link>
    )
}
