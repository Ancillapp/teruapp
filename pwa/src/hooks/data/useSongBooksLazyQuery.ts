import { useCallback } from 'react';
import { SongBookSummary } from '../../models/songBook';

import { useLazyQuery, UseLazyQueryResult, UseQueryOptions } from '../fetching';

export interface SongBooksLazyQueryParams {
  community?: string;
}

export type SongBooksLazyQueryFunction = (
  params?: SongBooksLazyQueryParams,
  options?: UseQueryOptions<never, SongBooksLazyQueryParams>,
) => Promise<SongBookSummary[]>;

const useSongBooksLazyQuery = (): [
  SongBooksLazyQueryFunction,
  UseLazyQueryResult<SongBookSummary[]>,
] => {
  const [getSongBooks, data] = useLazyQuery<
    SongBookSummary[],
    never,
    SongBooksLazyQueryParams
  >('songbooks');

  const query = useCallback<SongBooksLazyQueryFunction>(
    async ({ community } = {}, options) =>
      getSongBooks({
        ...options,
        query: {
          ...options?.query,
          ...(community && { community }),
        },
      }),
    [getSongBooks],
  );

  return [query, data];
};

export default useSongBooksLazyQuery;
