import { useCallback, useEffect, useMemo, useState } from 'react';

import { toQueryParams } from '../helpers/query';
import { useAPI } from '../providers/APIProvider';

export interface RequestInitWithQueryParams extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: Record<string, any>;
}

export interface RequestParams<
  B = undefined,
  P extends string | undefined = undefined,
  Q extends Record<string, unknown> | undefined = undefined
> {
  body?: B;
  query?: Q;
  path?: P;
}

const configureRequest = <
  T = undefined,
  B = undefined,
  P extends string | undefined = undefined,
  Q extends Record<string, unknown> | undefined = undefined
>(
  url: string,
  options: RequestInitWithQueryParams = {},
) => async ({
  body,
  path = '',
  query,
}: RequestParams<B, P, Q> = {}): Promise<T> => {
  const mergedUrl = new URL(path, url).toString();

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

  const mergedUrl = new URL(url, baseUrl).toString();

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
  }, []);

  useEffect(() => {
    refetch().catch(() => undefined);
  }, []);

  return {
    ...queryValue,
    refetch,
  };
};
