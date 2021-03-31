import { useEffect } from 'react';

import { useDebounce } from 'use-debounce';

import useLazyFullTextSearch, {
  UseLazyFullTextSearchOptions,
} from './useLazyFullTextSearch';

export type UseFullTextSearchHookOptions<
  T = Record<string, unknown>
> = UseLazyFullTextSearchOptions<T> & {
  readonly debounce?: number;
};

export type UseFullTextSearchHook = <T = Record<string, unknown>>(
  list: readonly T[],
  keys: readonly (keyof T)[],
  keyword: string,
  options?: UseFullTextSearchHookOptions<T>,
) => readonly T[];

const useFullTextSearch: UseFullTextSearchHook = <T = Record<string, unknown>>(
  list: readonly T[],
  keys: readonly (keyof T)[],
  keyword: string,
  { debounce = 0, ...options }: UseFullTextSearchHookOptions<T> = {},
) => {
  const [search, results] = useLazyFullTextSearch(list, keys, options);

  const [debouncedKeyword] = useDebounce(keyword, debounce);

  useEffect(() => {
    search(debouncedKeyword);
  }, [debouncedKeyword, search, list]);

  return results;
};

export default useFullTextSearch;
