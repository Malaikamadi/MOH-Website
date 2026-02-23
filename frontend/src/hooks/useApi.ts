import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data from the Strapi API.
 * Handles loading states, errors, and caching.
 * 
 * Usage:
 *   const { data, loading, error, refetch } = useApi(getHeroSlides);
 *   const { data } = useApi(() => getNewsArticles({ category: 'Press Release', limit: 5 }));
 */
export function useApi<T>(
    fetcher: () => Promise<T>,
    deps: unknown[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetcher();
            setData(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            console.error('API fetch error:', err);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
