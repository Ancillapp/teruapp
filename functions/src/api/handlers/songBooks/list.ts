import { list, SongBookSummaryData } from '../../../services/songBook';

import type { RequestHandler } from 'express-serve-static-core';

export interface GetSongBooksQueryParams {
  community?: string;
}

export const getSongBooks: RequestHandler<
  never,
  SongBookSummaryData[],
  never,
  GetSongBooksQueryParams,
  Record<string, unknown>
> = async ({ query: { community } }, res) => {
  const songBooks = await list({
    ...(typeof community === 'string' && { community }),
  });

  res.json(songBooks);
};
