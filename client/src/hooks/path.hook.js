import {useEffect, useState} from "react";

export const usePath = () => {
    const [path, setPath] = useState(window.location.pathname);
    const changePathHandler = () => {
        setPath(window.location.pathname);
    }
    useEffect(()=> {
        window.addEventListener('popstate', changePathHandler)
        return () => {
            window.removeEventListener("popstate", changePathHandler)
        }
    }, [])
    return path;
}
