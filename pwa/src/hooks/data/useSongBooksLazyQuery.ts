import { useCallback } from 'react';
import { SongBookSummary } from '../../models/songBook';

import { useLazyQuery, UseLazyQueryResult } from '../fetching';

export interface SongBooksLazyQueryParams {
  community?: string;
}

export type SongBooksLazyQueryFunction = (
  params?: SongBooksLazyQueryParams,
) => Promise<SongBookSummary[]>;

const useSongBooksLazyQuery = (): [
  SongBooksLazyQueryFunction,
  UseLazyQueryResult<SongBookSummary[]>,
] => {
  const [getSongBooks, data] = useLazyQuery<
    SongBookSummary[],
    undefined,
    undefined,
    SongBooksLazyQueryParams
  >('songbooks');

  const query = useCallback<SongBooksLazyQueryFunction>(
    async ({ community } = {}) =>
      getSongBooks(
        community
          ? {
              query: { community },
            }
          : undefined,
      ),
    [getSongBooks],
  );

  return [query, data];
};

export default useSongBooksLazyQuery;
