/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from 'react';

import merge from 'deepmerge';

import { useDeepCompareMemo } from 'use-deep-compare';

import { joinUrls, toQueryParams } from '../helpers/url';
import { useAPI } from '../providers/APIProvider';

export interface RequestOptions<
  P extends Record<string, any> | undefined = undefined,
  Q extends Record<string, any> | undefined = undefined,
  B = undefined
> extends Omit<RequestInit, 'body'> {
  params?: P;
  query?: Q;
  body?: B;
}

const performRequest = async <
  T = undefined,
  P extends Record<string, any> | undefined = undefined,
  Q extends Record<string, any> | undefined = undefined,
  B = undefined
>(
  url: string,
  { body, params = {}, query, ...options }: RequestOptions<P, Q, B> = {},
): Promise<T> => {
  const urlWithParams = url.replace(/:([a-z]+)/gi, (_, match) => params[match]);

  const urlWithQuery = query
    ? `${urlWithParams}?${toQueryParams(query)}`
    : urlWithParams;

  const res = await fetch(urlWithQuery, {
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

export type UseLazyQueryGetFunction<
  T = undefined,
  P extends Record<string, any> | undefined = undefined,
  Q = undefined,
  B = undefined
> = (params?: RequestOptions<P, Q, B>) => Promise<T>;

export interface UseLazyQueryResult<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

export type UseLazyQueryValue<
  T = undefined,
  P extends Record<string, any> | undefined = undefined,
  Q = undefined,
  B = undefined
> = [UseLazyQueryGetFunction<T, P, Q, B>, UseLazyQueryResult<T>];

export const useLazyQuery = <
  T = undefined,
  P extends Record<string, any> | undefined = undefined,
  Q = undefined,
  B = undefined
>(
  url: string,
  options: RequestOptions<P, Q, B> = {},
): UseLazyQueryValue<T, P, Q, B> => {
  const { baseUrl } = useAPI();

  const mergedUrl = joinUrls(baseUrl, url);

  const memoizedOptions = useDeepCompareMemo(() => options, [options]);

  const [queryValue, setQueryValue] = useState<
    Omit<UseQueryValue<T>, 'refetch'>
  >({ loading: true });

  const request = useCallback<UseLazyQueryGetFunction<T, P, Q, B>>(
    async (requestOptions = {}) => {
      setQueryValue({ loading: true });

      try {
        const data = await performRequest<T, P, Q, B>(
          mergedUrl,
          merge(memoizedOptions, requestOptions),
        );
        setQueryValue({ loading: false, data });

        return data;
      } catch (error) {
        setQueryValue({ loading: false, error });

        throw error;
      }
    },
    [memoizedOptions, mergedUrl],
  );

  return [request, queryValue];
};

export interface UseQueryOptions<
  P extends Record<string, any> | undefined = undefined,
  Q extends Record<string, any> | undefined = undefined,
  B = undefined
> extends RequestOptions<P, Q, B> {
  enable?: boolean;
}

export interface UseQueryValue<T> {
  loading: boolean;
  data?: T;
  error?: Error;
  refetch(): Promise<T>;
}

export const useQuery = <
  T = undefined,
  P extends Record<string, any> | undefined = undefined,
  Q = undefined,
  B = undefined
>(
  url: string,
  { enable = true, ...options }: UseQueryOptions<P, Q, B> = {},
): UseQueryValue<T> => {
  const memoizedOptions = useDeepCompareMemo(() => options, [options]);

  const [refetch, queryValue] = useLazyQuery<T, P, Q, B>(url, memoizedOptions);

  useEffect(() => {
    if (enable) {
      // We don't want the function to throw; the error
      // is already exposed in the returned object.
      refetch().catch(() => undefined);
    }
  }, [enable, memoizedOptions, refetch, url]);

  return {
    ...queryValue,
    refetch,
  };
};
