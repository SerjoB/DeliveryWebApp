import { useEffect, useState } from "react";

export function useAsync(fn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        fn()
            .then((result) => { if (!cancelled) setData(result); })
            .catch((e) => { if (!cancelled) setError(e.message); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, deps);

    return { data, loading, error };
}