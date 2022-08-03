import {useCallback, useEffect, useState} from "react";
import {useHttp} from "./http.hook";
import {getHeader} from "../methods/getHeader";
const storageName = "userData"

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [waitingChanges, setWaitingChanges] = useState(false);
    const [waitingVerification, setWaitingVerification] = useState(true);
    const {request} = useHttp();

    const login = useCallback((userToken, userId)=>{
        setToken(userToken);
        setUserId(userId);
        localStorage.setItem(storageName, JSON.stringify({
            token: userToken,
            id: userId
        }))
    }, [])


    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, [])

    const checkData = async () => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data) {
            setWaitingVerification(true);
            try {
                await request('/api/auth/exists', 'POST', null, getHeader(data.id, data.token))
            } catch (e) {
                logout();
            } finally {
                setWaitingVerification(false);
            }
        } else {
            logout();
        }

    }

    useEffect(()=> {
        setWaitingChanges(true);
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token && data.id) {
            login(data.token, data.id);
        }
        setWaitingChanges(false);
    }, [])

    return { login, logout, token, userId, checkData, waitingChanges, waitingVerification }

}
