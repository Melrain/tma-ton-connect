"use client";
import { useCallback, useEffect, useState } from "react";

interface UseMongodbOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UserMongodbReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

export const useMongodb = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseMongodbOptions<T, P>): UserMongodbReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams: P) => await fetchData(newParams);

  return { data, loading, error, refetch };
};
