import { useLiveQuery } from 'dexie-react-hooks';

import { SongBookSong } from '../../models/song';
import { db } from '../../helpers/db';

import { useQuery } from '../fetching';
import { useEffect } from 'react';

const useSongQuery = (songBookId: string, songId: string) => {
  const song = useLiveQuery(
    async (): Promise<SongBookSong | undefined> => {
      const [dbSongBook, dbSong] = await Promise.all([
        db.songBooks.get(songBookId),
        db.songs.get(songId),
      ]);

      // If we don't have cached both the song book and the song yet,
      // we just ignore the cache as we don't have the necessary data
      if (!dbSongBook || !dbSongBook.songs || !dbSong || !dbSong.content) {
        return;
      }

      const dbSongBookSong = dbSongBook.songs.find(({ id }) => id === songId);

      // If we don't have cached this song for this song book yet,
      // we ignore the cache instead of returning partial data
      if (!dbSongBookSong) {
        return;
      }

      return {
        ...dbSong,
        number: dbSongBookSong.number,
      } as SongBookSong;
    },
  );

  const { data, ...rest } = useQuery<SongBookSong>(
    `songbooks/${songBookId}/songs/${songId}`,
  );

  useEffect(() => {
    if (data) {
      db.songs.put(data);
    }
  }, [data]);

  return { data: song, ...rest };
};

export default useSongQuery;
