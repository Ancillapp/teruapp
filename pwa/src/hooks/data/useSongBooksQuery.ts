import { useEffect } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';

import { SongBookSummary } from '../../models/songBook';

import { useQuery, UseQueryOptions } from '../fetching';
import { db, DBSongBook } from '../../helpers/db';

export interface SongBooksQueryParams {
  community?: string;
}

const useSongBooksQuery = (
  { community }: SongBooksQueryParams = {},
  options?: UseQueryOptions,
) => {
  const songBooks = useLiveQuery(async (): Promise<
    SongBookSummary[] | undefined
  > => {
    if (!community) {
      // If the query is not filtered by community, return all the song books
      return db.songBooks.toArray();
    }

    const dbCommunity = await db.communities.get(community);

    // If the community has been cached, but it doesn't have the song books
    // array, it means that we only cached the summary of the community,
    // so we just ignore the cached data
    if (!dbCommunity || !dbCommunity.songBooks) {
      return;
    }

    const dbSongBooks = await db.songBooks.bulkGet(
      dbCommunity.songBooks.map(({ id }) => id),
    );

    return dbSongBooks.filter(Boolean) as DBSongBook[];
  }, [community]);

  const { data, loading, ...rest } = useQuery<
    SongBookSummary[],
    never,
    SongBooksQueryParams
  >('songbooks', {
    ...options,
    query: {
      ...(options?.query || {}),
      ...(community && { community }),
    },
  });

  useEffect(() => {
    if (data) {
      if (community) {
        db.communities.get(community).then((dbCommunity) => {
          if (!dbCommunity) {
            return;
          }

          return db.communities.put({
            ...dbCommunity,
            songBooks: Array.from(
              // We use a set to check all the duplicate IDs and remove them
              new Set([
                ...(dbCommunity.songBooks?.map(({ id }) => id) || []),
                ...data.map(({ id }) => id),
              ]),
            ).map((id) => ({ id })),
          });
        });
      }

      db.songBooks.bulkUpsert(
        data.map(({ id }) => id),
        data,
      );
    }
    // We don't want to add the community to the dependencies to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    data:
      // If we are still running the query and we couldn't find any song book in the cache,
      // we return undefined as we effectively don't have any available data yet
      loading && songBooks && songBooks.length < 1 ? undefined : songBooks,
    loading,
    ...rest,
  };
};

export default useSongBooksQuery;
