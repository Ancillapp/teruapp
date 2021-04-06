import { SongBook } from '../../models/songBook';

import { useQuery, UseQueryOptions } from '../fetching';

export interface SongBookQueryOptions {
  fullData?: boolean;
}

const useSongBookQuery = (
  id: string,
  { fullData }: SongBookQueryOptions = {},
  options?: UseQueryOptions,
) =>
  useQuery<SongBook, never, SongBookQueryOptions>(`songbooks/${id}`, {
    ...options,
    query: {
      ...(options?.query || {}),
      ...(fullData && { fullData }),
    },
  });

export default useSongBookQuery;
