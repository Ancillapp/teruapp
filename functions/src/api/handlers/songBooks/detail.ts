import { get, SongBookData } from '../../../services/songBook';

import type { RequestHandler } from 'express-serve-static-core';

export interface GetSongBookParams {
  songBookId: string;
}

export const getSongBook: RequestHandler<
  GetSongBookParams,
  SongBookData,
  never,
  never,
  Record<string, unknown>
> = async ({ params: { songBookId } }, res) => {
  const songBook = await get(songBookId);

  if (!songBook) {
    return res.status(404).send();
  }

  return res.json(songBook);
};
