import { useCallback } from 'react';

import { useQuery as useReactQuery } from 'react-query';

import { toQueryParams } from '../helpers/query';
import { useAPI } from '../providers/APIProvider';

export interface UseQueryValue<T> {
  loading: boolean;
  data?: T;
  error?: Error;
  refetch(): Promise<T>;
}

export interface RequestInitWithQueryParams extends RequestInit {
  query?: unknown;
}

const useQuery = <T>(
  url: string,
  options: RequestInitWithQueryParams = {},
): UseQueryValue<T> => {
  const { baseUrl } = useAPI();

  const urlWithParams = options.query
    ? `${url}?${toQueryParams(options.query)}`
    : url;

  const {
    isLoading: loading,
    data,
    error,
    refetch: refetchQuery,
  } = useReactQuery<T, Error>(
    urlWithParams,
    async () => {
      const res = await fetch(`${baseUrl}/${urlWithParams}`, {
        ...options,
        headers: {
          accept: 'application/json',
          ...options.headers,
        },
      });

      return res.status === 204 ? undefined : res.json();
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const refetch = useCallback(async () => {
    const { data } = await refetchQuery({ throwOnError: true });
    return data as T;
  }, [refetchQuery]);

  return { loading, data, error: error || undefined, refetch };
};

export default useQuery;
