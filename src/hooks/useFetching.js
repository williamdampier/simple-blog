import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setLoading(true);
            await callback(...args);
        } catch (e){
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return [fetching, isLoading, error];
}