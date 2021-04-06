import { SongBookSummary } from '../../models/songBook';

import { useQuery, UseQueryOptions } from '../fetching';

export interface SongBooksQueryParams {
  community?: string;
}

const useSongBooksQuery = (
  { community }: SongBooksQueryParams = {},
  options?: UseQueryOptions,
) =>
  useQuery<SongBookSummary[], never, SongBooksQueryParams>('songbooks', {
    ...options,
    query: {
      ...(options?.query || {}),
      ...(community && { community }),
    },
  });

export default useSongBooksQuery;
