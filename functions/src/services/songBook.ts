import { mongoDb } from '../helpers/mongo';
import { SongBook } from '../models/mongo';

export interface SongBookData extends Omit<SongBook, '_id'> {
  id: string;
}

const getSongBooksCollection = async () => {
  const db = await mongoDb;

  return db.collection<SongBook>('songBooks');
};

export const list = async () => {
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
};
