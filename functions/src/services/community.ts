import { mongoDb, ObjectId } from '../helpers/mongo';
import { Community } from '../models/mongo';

export interface CommunityData extends Omit<Community, '_id' | 'songBooks'> {
  id: string;
}

const getCommunitiesCollection = async () => {
  const db = await mongoDb;

  return db.collection<Community>('communities');
};

export interface CommunitiesListParams {
  songBook?: string;
}

export const list = async ({ songBook }: CommunitiesListParams = {}) => {
  const communitiesCollection = await getCommunitiesCollection();

  const communities = (await communitiesCollection
    .find(
      {
        ...(songBook && {
          songBooks: {
            $elemMatch: {
              id: new ObjectId(songBook),
            },
          },
        }),
      },
      {
        projection: {
          _id: 0,
          id: '$_id',
          name: 1,
        },
      },
    )
    .toArray()) as CommunityData[];

  return communities;
};
