import { useLiveQuery } from 'dexie-react-hooks';

import { SongBook } from '../../models/songBook';
import { db, DBSong } from '../../helpers/db';

import { useQuery, UseQueryOptions } from '../fetching';
import { useEffect } from 'react';

export interface SongBookQueryOptions {
  fullData?: boolean;
}

const useSongBookQuery = (
  id: string,
  { fullData }: SongBookQueryOptions = {},
  options?: UseQueryOptions,
) => {
  const songBook = useLiveQuery(
    async (): Promise<SongBook | undefined> => {
      const dbSongBook = await db.songBooks.get(id);

      // If the song book has been cached, but it doesn't have the songs
      // array, it means that we only cached the summary of the song book,
      // so we just ignore the cached data
      if (!dbSongBook || !dbSongBook.songs) {
        return;
      }

      const songBookSongNumbersKeyVal = Object.fromEntries(
        dbSongBook.songs.map(({ id, number }) => [id, number]),
      );

      const songs = await db.songs.bulkGet(
        dbSongBook.songs.map(({ id }) => id),
      );

      return {
        ...dbSongBook,
        songs: (songs.filter(Boolean) as DBSong[]).map((song) => ({
          ...song,
          number: songBookSongNumbersKeyVal[song.id],
        })),
      };
    },
  );

  const { data, ...rest } = useQuery<SongBook, never, SongBookQueryOptions>(
    `songbooks/${id}`,
    {
      ...options,
      query: {
        ...(options?.query || {}),
        ...(fullData && { fullData }),
      },
    },
  );

  useEffect(() => {
    if (data) {
      db.songBooks.put({
        ...data,
        songs: data.songs.map(({ id, number }) => ({ id, number })),
      });

      db.songs.bulkUpsert(
        data.songs.map(({ id }) => id),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.songs.map(({ number, ...song }) => song),
      );
    }
  }, [data]);

  return { data: songBook, ...rest };
};

export default useSongBookQuery;
