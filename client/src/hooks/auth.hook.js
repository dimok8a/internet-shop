import {useCallback, useEffect, useState} from "react";
import {useHttp} from "./http.hook";
const storageName = "userData"

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [waitingChanges, setWaitingChanges] = useState(false);
    const [waitingVerification, setWaitingVerification] = useState(false);
    const {request} = useHttp();

    const login = useCallback((userToken, userId)=>{
        setToken(()=> userToken);
        setUserId(()=> userId);
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
        setWaitingVerification(true);
        const data = JSON.parse(localStorage.getItem(storageName));
        try {
            await request('/api/auth/exists', 'POST', {
                token: data.token,
                id: data.id
            })
            login(data.token, data.id);
        } catch (e) {
            logout();
        } finally {
            setWaitingVerification(false);
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