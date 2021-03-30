import { CommunityData, list } from '../../../services/community';

import type { RequestHandler } from 'express-serve-static-core';

export interface GetCommunitiesQueryParams {
  songBook?: string;
}

export const getCommunities: RequestHandler<
  never,
  CommunityData[],
  never,
  GetCommunitiesQueryParams,
  Record<string, unknown>
> = async ({ query: { songBook } }, res) => {
  const communities = await list({
    ...(typeof songBook === 'string' && { songBook }),
  });

  res.json(communities);
};
