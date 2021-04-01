import { SongBook } from '../models/songBook';

import useQuery from './useQuery';

export interface SongBooksQueryParams {
  community?: string;
}

const useSongBooksQuery = ({ community }: SongBooksQueryParams = {}) =>
  useQuery<SongBook[]>(
    'songbooks',
    community
      ? {
          query: { community },
        }
      : undefined,
  );

export default useSongBooksQuery;
