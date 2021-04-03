import { SongBookSummary } from '../../models/songBook';

import { useQuery } from '../fetching';

export interface SongBooksQueryParams {
  community?: string;
}

const useSongBooksQuery = ({ community }: SongBooksQueryParams = {}) =>
  useQuery<SongBookSummary[]>(
    'songbooks',
    community
      ? {
          query: { community },
        }
      : undefined,
  );

export default useSongBooksQuery;
