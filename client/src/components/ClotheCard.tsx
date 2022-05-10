import React from "react";
import {IClothe} from "../interfaces";


export const ClotheCard:React.FunctionComponent<{ clothe: IClothe }> = (props) => {
    const clothe = props.clothe;
    return (
            <a href={window.location.href + "/" + clothe.id.toString()} className="clothe_card" key={clothe.id}>
                <div className="clothe_card_cover">
                    <div className="card-image">
                        <img src={`${JSON.parse(clothe.images)[0]}/M`}/>
                    </div>
                    <div className="card-price">
                        {clothe.price} RUB
                    </div>
                    <div className="card-name">
                        <p>{clothe.name}</p>
                    </div>
                </div>
            </a>
    )
}