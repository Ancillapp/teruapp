import { useCallback, useEffect, useMemo, useState } from 'react';

import { joinUrls, toQueryParams } from '../helpers/url';
import { useAPI } from '../providers/APIProvider';

export interface RequestInitWithQueryParams extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: Record<string, any>;
}

export interface RequestParams<
  B = undefined,
  P extends string | undefined = undefined,
  Q = undefined
> {
  body?: B;
  query?: Q;
  path?: P;
}

const configureRequest = <
  T = undefined,
  B = undefined,
  P extends string | undefined = undefined,
  Q = undefined
>(
  url: string,
  options: RequestInitWithQueryParams = {},
) => async ({
  body,
  path = '',
  query,
}: RequestParams<B, P, Q> = {}): Promise<T> => {
  const mergedUrl = joinUrls(url, path);

  const urlWithParams =
    options.query || query
      ? `${mergedUrl}?${toQueryParams({ ...options.query, ...query })}`
      : mergedUrl;

  const res = await fetch(urlWithParams, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(body && { 'content-type': 'application/json' }),
      ...options.headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (res.status === 204) {
    return (undefined as unknown) as T;
  }

  const responseBody = await res.json().catch(() => undefined);

  if (res.status >= 400) {
    throw new Error(responseBody || 'There was an unexpected error');
  }

  return responseBody;
};

export interface UseQueryValue<T> {
  loading: boolean;
  data?: T;
  error?: Error;
  refetch(): Promise<T>;
}

export const useQuery = <T>(
  url: string,
  options?: RequestInitWithQueryParams,
): UseQueryValue<T> => {
  const { baseUrl } = useAPI();

  const mergedUrl = joinUrls(baseUrl, url);

  const performRequest = useMemo(
    () => configureRequest<T>(mergedUrl, options),
    [mergedUrl, options],
  );

  const [queryValue, setQueryValue] = useState<
    Omit<UseQueryValue<T>, 'refetch'>
  >({ loading: true });

  const refetch = useCallback<UseQueryValue<T>['refetch']>(async () => {
    setQueryValue({ loading: true });

    try {
      const data = await performRequest();
      setQueryValue({ loading: false, data });

      return data;
    } catch (error) {
      setQueryValue({ loading: false, error });

      throw error;
    }
  }, [performRequest]);

  useEffect(() => {
    refetch().catch(() => undefined);
  }, [refetch]);

  return {
    ...queryValue,
    refetch,
  };
};

export type UseLazyQueryGetFunction<
  T = undefined,
  B = undefined,
  P extends string | undefined = undefined,
  Q = undefined
> = (params?: RequestParams<B, P, Q>) => Promise<T>;

export interface UseLazyQueryResult<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

export type UseLazyQueryValue<
  T = undefined,
  B = undefined,
  P extends string | undefined = undefined,
  Q = undefined
> = [UseLazyQueryGetFunction<T, B, P, Q>, UseLazyQueryResult<T>];

export const useLazyQuery = <
  T = undefined,
  B = undefined,
  P extends string | undefined = undefined,
  Q = undefined
>(
  url: string,
  options?: RequestInitWithQueryParams,
): UseLazyQueryValue<T, B, P, Q> => {
  const { baseUrl } = useAPI();

  const mergedUrl = joinUrls(baseUrl, url);

  const performRequest = useMemo(
    () => configureRequest<T, B, P, Q>(mergedUrl, options),
    [mergedUrl, options],
  );

  const [queryValue, setQueryValue] = useState<
    Omit<UseQueryValue<T>, 'refetch'>
  >({ loading: true });

  const request = useCallback<UseLazyQueryGetFunction<T, B, P, Q>>(
    async (params) => {
      setQueryValue({ loading: true });

      try {
        const data = await performRequest(params);
        setQueryValue({ loading: false, data });

        return data;
      } catch (error) {
        setQueryValue({ loading: false, error });

        throw error;
      }
    },
    [performRequest],
  );

  return [request, queryValue];
};
