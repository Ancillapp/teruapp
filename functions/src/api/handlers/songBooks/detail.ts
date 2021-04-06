import { get, SongBookData } from '../../../services/songBook';

import type { RequestHandler } from 'express-serve-static-core';

export interface GetSongBookParams {
  songBookId: string;
}

export interface GetSongBookQueryParams {
  fullData?: string;
}

export const getSongBook: RequestHandler<
  GetSongBookParams,
  SongBookData,
  never,
  GetSongBookQueryParams,
  Record<string, unknown>
> = async ({ params: { songBookId }, query: { fullData } }, res) => {
  const songBook = await get(songBookId, {
    fullData: typeof fullData !== 'undefined',
  });

  if (!songBook) {
    return res.status(404).send();
  }

  return res.json(songBook);
};
