import { list, SongBookData } from '../../../services/songBook';

import type { RequestHandler } from 'express-serve-static-core';

export const getSongBooks: RequestHandler<
  never,
  SongBookData[],
  never,
  never,
  Record<string, unknown>
> = async (_, res) => {
  const songBooks = await list();

  res.json(songBooks);
};
