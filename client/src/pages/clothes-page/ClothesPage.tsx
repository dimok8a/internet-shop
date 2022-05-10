import React, {useEffect, useState} from "react";
import {IClothe, IUrl} from "../../interfaces";
import {ClotheCard} from "../../components/ClotheCard";
import {useHttp} from "../../hooks/http.hook";
import {Loading} from "../../components/Loading";
import './clothesPage.style.css'
import {useMessage} from "../../hooks/message.hook";
import {clothesPageRequest} from "../../requests/clothes-requests/clothes-page.request";

export const ClothesPage:React.FunctionComponent<{clotheData:IUrl}> = (props) => {
    const [clothes, setClothes] = useState<IClothe[]>([]);
    const clotheType = props.clotheData;
    const { request } = useHttp()
    const [componentDidMount, setComponentDidMount] = useState(false);
    const message = useMessage();
    // Показываем одежду, полученную с сервера
    useEffect(()=>{
        const fetchData = async () => {
            try {
                return (await request(clothesPageRequest(clotheType.url))).data
            } catch (e) {
                message(e);
            }
        }
        fetchData()
            .then(data => {
                setClothes(data)
            })
            .finally(() => setComponentDidMount(true))
    }, [clotheType])


    if (!componentDidMount)
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
