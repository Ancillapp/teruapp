import { mongoDb, ObjectId } from '../helpers/mongo';
import { Community, Song, SongBook } from '../models/mongo';

export interface SongBookSongData extends Pick<Song, 'title' | 'category'> {
  id: string;
  number: string;
}

export interface SongBookSummaryData extends Omit<SongBook, '_id'> {
  id: string;
}

export interface SongBookData extends SongBookSummaryData {
  songs: SongBookSongData[];
}

const getCommunitiesCollection = async () => {
  const db = await mongoDb;

  return db.collection<Community>('communities');
};

const getSongsCollection = async () => {
  const db = await mongoDb;

  return db.collection<Song>('songs');
};

const getSongBooksCollection = async () => {
  const db = await mongoDb;

  return db.collection<SongBook>('songBooks');
};

export const get = async (id: string) => {
  const [songBooksCollection, songsCollection] = await Promise.all([
    getSongBooksCollection(),
    getSongsCollection(),
  ]);

  const [songBook, songs] = await Promise.all([
    songBooksCollection.findOne({ _id: new ObjectId(id) }),
    songsCollection
      .find<{
        id: string;
        title: string;
        category: string;
        songBooks: [Song['songBooks'][number]];
      }>(
        {
          songBooks: {
            $elemMatch: {
              id: new ObjectId(id),
            },
          },
        },
        {
          projection: {
            _id: 0,
            id: '$_id',
            title: 1,
            category: 1,
            'songBooks.$': 1,
          },
        },
      )
      .toArray(),
  ]);

  return songBook
    ? {
        id: songBook._id.toHexString(),
        title: songBook.title,
        songs: songs
          .map(({ songBooks, ...rest }) => ({
            ...rest,
            number: songBooks[0].number,
          }))
          .sort(({ number: a }, { number: b }) => {
            const normalizedA = a.replace('bis', '').padStart(10, '0');
            const normalizedB = b.replace('bis', '').padStart(10, '0');

            if (normalizedA === normalizedB) {
              return b.includes('bis') ? -1 : 1;
            }

            return normalizedA < normalizedB ? -1 : 1;
          }),
      }
    : null;
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

    return ((result?.songBooks || []) as unknown) as SongBookSummaryData[];
  } else {
    const songBooksCollection = await getSongBooksCollection();

    const songBooks = ((await songBooksCollection
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
      .toArray()) as unknown) as SongBookSummaryData[];

    return songBooks;
  }
};
