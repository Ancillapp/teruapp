import { mongoDb, ObjectId } from '../helpers/mongo';
import { Community, SongBook } from '../models/mongo';

export interface SongBookData extends Omit<SongBook, '_id'> {
  id: string;
}

const getCommunitiesCollection = async () => {
  const db = await mongoDb;

  return db.collection<Community>('communities');
};

const getSongBooksCollection = async () => {
  const db = await mongoDb;

  return db.collection<SongBook>('songBooks');
};

export interface SongBooksListParams {
  community?: string;
}

export const list = async ({ community }: SongBooksListParams = {}) => {
  if (community) {
    const communitiesCollection = await getCommunitiesCollection();

    const result = await communitiesCollection.findOne(
      { _id: new ObjectId(community) },
      {
        projection: {
          _id: 0,
          songBooks: 1,
        },
      },
    );

    return ((result?.songBooks || []) as unknown) as SongBookData[];
  } else {
    const songBooksCollection = await getSongBooksCollection();

    const songBooks = (await songBooksCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: '$_id',
            title: 1,
          },
        },
      )
      .toArray()) as SongBookData[];

    return songBooks;
  }
};
