import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState('');

    const fetch = async () => {
        try {
            setLoading(true);
            await callback();
        } catch (e){
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return [fetch, isLoading, isError];
}