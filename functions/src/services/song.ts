import { mongoDb, ObjectId } from '../helpers/mongo';
import { Song } from '../models/mongo';

export interface SongData extends Omit<Song, '_id' | 'songBooks'> {
  id: string;
  number?: string;
}

const getSongsCollection = async () => {
  const db = await mongoDb;

  return db.collection<Song>('songs');
};

export interface SongGetParams {
  songBookId?: string;
}

export const get = async (id: string, { songBookId }: SongGetParams = {}) => {
  const songsCollection = await getSongsCollection();

  const song = await songsCollection.findOne<
    Omit<SongData, 'number'> & {
      songBooks?: [Song['songBooks'][number]];
    }
  >(
    {
      _id: new ObjectId(id),
      ...(songBookId && {
        songBooks: {
          $elemMatch: {
            id: new ObjectId(songBookId),
          },
        },
      }),
    },
    {
      projection: {
        _id: 0,
        id: '$_id',
        title: 1,
        language: 1,
        category: 1,
        content: 1,
        ...(songBookId && { 'songBooks.$': 1 }),
      },
    },
  );

  if (!song) {
    return null;
  }

  const { songBooks: [{ number = undefined } = {}] = [], ...rest } = song;

  return {
    ...rest,
    ...(number && { number }),
  };
};
