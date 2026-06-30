import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../utils/api';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = useCallback(async (abortSignal) => {
    if (!url) return;
    try {
      setLoading(true);
      const res = await api.get(url, { signal: abortSignal });
      if (!abortSignal.aborted) {
        setData(res.data);
        setError(null);
      }
    } catch (err) {
      if (!abortSignal.aborted && err.name !== 'CanceledError') {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      if (!abortSignal.aborted) setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;
    fetchData(controller.signal);
    return () => {
      controller.abort();
      controllerRef.current = null;
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    fetchData(controller.signal);
  }, [fetchData]);

  return { data, loading, error, refetch };
}
