import { useCallback, useEffect, useState } from 'react';

import Fuse from 'fuse.js';

export type UseLazyFullTextSearchOptions<T = Record<string, unknown>> = Omit<
  Fuse.IFuseOptions<T>,
  'keys'
>;

export type UseLazyFullTextSearchCallback<T = Record<string, unknown>> = (
  keyword: string,
) => Promise<readonly T[]>;

export type UseLazyFullTextSearchResult<
  T = Record<string, unknown>
> = readonly [UseLazyFullTextSearchCallback<T>, readonly T[]];

export type UseLazyFullTextSearchHook = <T = Record<string, unknown>>(
  list: readonly T[],
  keys: readonly (keyof T)[],
  options?: UseLazyFullTextSearchOptions<T>,
) => UseLazyFullTextSearchResult<T>;

const useLazyFullTextSearch: UseLazyFullTextSearchHook = <
  T = Record<string, unknown>
>(
  list: readonly T[],
  keys: readonly (keyof T)[],
  options?: UseLazyFullTextSearchOptions<T>,
) => {
  const [fuse, setFuse] = useState<Fuse<T> | null>(null);
  const [results, setResults] = useState<readonly T[]>(list);

  useEffect(() => {
    setFuse((fuseInstance) => {
      if (fuseInstance) {
        fuseInstance.setCollection(list);
        return fuseInstance;
      } else {
        return new Fuse(list, {
          keys: (keys as unknown) as string[],
          ...options,
        });
      }
    });
  }, [keys, list, options]);

  const search = useCallback<UseLazyFullTextSearchCallback<T>>(
    async (keyword) => {
      const filteredList =
        fuse && keyword ? fuse.search(keyword).map(({ item }) => item) : list;

      setResults(filteredList);

      return filteredList;
    },
    [fuse, list],
  );

  return [search, results];
};

export default useLazyFullTextSearch;
