import { list } from '../../../services/community';

import type { RequestHandler } from 'express';

export const getCommunities: RequestHandler = async (
  { query: { songBook } },
  res,
) => {
  const communities = await list({
    ...(typeof songBook === 'string' && { songBook }),
  });

  res.json(communities);
};
