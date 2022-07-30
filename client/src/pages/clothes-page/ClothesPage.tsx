import React, {useEffect, useState} from "react";
import {IClothe, IUrl} from "../../interfaces";
import {ClotheCard} from "../../components/ClotheCard";
import {useHttp} from "../../hooks/http.hook";
import {Loading} from "../../components/loading/Loading";
import './clothesPage.style.css'
import {clothesPageRequest} from "../../requests/clothes-requests/clothes-page.request";

export const ClothesPage:React.FunctionComponent<{clotheData:IUrl}> = (props) => {
    const [clothes, setClothes] = useState<IClothe[]>([]);
    const clotheType = props.clotheData;
    const { request, loading } = useHttp()
    // Показываем одежду, полученную с сервера
    useEffect(()=>{
        (async () => {
            setClothes(await request(clothesPageRequest(clotheType.url)))
        })()
    }, [clotheType])

    if (loading)
        return (<Loading/>)
    return (
        <div className="clothes_list">
                {
                    clothes.map(
                        iterClothe =>
                            <ClotheCard key={iterClothe.id} clothe={iterClothe}/>
                    )
                }
        </div>
    )
}
