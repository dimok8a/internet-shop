import React, {useContext, useEffect, useState} from "react";
import {useAuth} from "../../../../hooks/auth.hook";
import {useRoutes} from "../../../../methods/routes";
import {AuthContext} from "../../../../context/AuthContext";
import {Loading} from "../../../../components/Loading";

export const AccountPage: React.FunctionComponent = () => {

    const { checkData } = useAuth();
    const {token} = useContext(AuthContext);
    const [waitingVerification, setWaitingVerification] = useState(true);
    useEffect(()=>{
        checkData().finally(()=>setWaitingVerification(false))
    }, [])
    const isAuth = !!token;
    const routes = useRoutes(isAuth);

    if (waitingVerification)
        return <Loading/>
    return (
        <>
            {routes}
        </>
    )
}
