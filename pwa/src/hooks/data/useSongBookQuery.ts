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

      if (!dbSongBook) {
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

      if (songBook) {
        const deletedSongs = songBook.songs.filter((song) =>
          data.songs.every(({ id }) => id !== song.id),
        );

        db.songs.bulkDelete(deletedSongs.map(({ id }) => id));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      db.songs.bulkPut(data.songs.map(({ number, ...song }) => song));
    }

    // We don't want to add the song book to the dependencies to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data: songBook, ...rest };
};

export default useSongBookQuery;
