// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toQueryParams = (query: any = {}) =>
  new URLSearchParams(Object.entries(query));

export const mergeQueryParams = (
  params: URLSearchParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entries: Record<string, any>,
) => {
  const newParams = new URLSearchParams(params);

  Object.entries(entries).forEach(([key, value]) => {
    if (typeof value === 'undefined' || value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams;
};

export const joinUrls = (...urlParts: string[]) =>
  urlParts
    .map((part) => (part.endsWith('/') ? part.slice(0, -1) : part))
    .join('/');
