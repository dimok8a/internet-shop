import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true);
        let err = null;
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method,  body, headers});
            const data = await response.json()
            if (response.status >= 300) {
                err = data;
            }
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false);
            return data
        } catch (e) {
            setLoading(false);
            throw err;
        }
    }, [])

    const clearError = useCallback(()=> setError(null), []);

    return { loading, request, error, clearError }
}
