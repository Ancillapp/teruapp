import { get, SongData } from '../../../services/song';

import type { RequestHandler } from 'express-serve-static-core';

export interface GetSongBookSongParams {
  songBookId: string;
  songId: string;
}

export const getSongBookSong: RequestHandler<
  GetSongBookSongParams,
  SongData,
  never,
  never,
  Record<string, unknown>
> = async ({ params: { songBookId, songId } }, res) => {
  const song = await get(songId, { songBookId });

  if (!song) {
    return res.status(404).send();
  }

  return res.json(song);
};
