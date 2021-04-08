import Dexie, { IndexableType, PromiseExtended, Table } from 'dexie';
import { Community } from '../models/community';
import { SongBookSummary } from '../models/songBook';
import { Song } from '../models/song';

export interface DBSetting {
  key: string;
  value: unknown;
}

export interface DBCommunity extends Community {
  songBooks?: {
    id: string;
  }[];
}

export interface DBSongBook extends SongBookSummary {
  songs?: {
    id: string;
    number: string;
  }[];
}

export interface DBSong extends Omit<Song, 'content'> {
  content?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TeruappTable<T = any, TKey = IndexableType>
  extends Table<T, TKey> {
  upsert(key: TKey, item: T): PromiseExtended<TKey>;
  bulkUpsert(keys: TKey[], items: readonly T[]): PromiseExtended<TKey>;
}

class TeruappDB extends Dexie {
  declare readonly tables: TeruappTable[];

  settings: TeruappTable<DBSetting, string>;
  communities: TeruappTable<DBCommunity, string>;
  songBooks: TeruappTable<DBSongBook, string>;
  songs: TeruappTable<DBSong, string>;

  constructor() {
    super('teruapp');

    // Dexie multiplies DB version number by 10,
    // so we set the version number divided by 10
    this.version(0.1).stores({
      settings: 'key',
      communities: 'id',
      songBooks: 'id',
      songs: 'id, category, language',
    });

    this.settings = this.table('settings');
    this.communities = this.table('communities');
    this.songBooks = this.table('songBooks');
    this.songs = this.table('songs');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table<T = any, TKey = IndexableType>(
    tableName: string,
  ): TeruappTable<T, TKey> {
    const table = super.table(tableName) as TeruappTable<T, TKey>;

    table.upsert = (key, item) =>
      table.get(key).then((value) =>
        table.put({
          ...value,
          ...item,
        }),
      );

    table.bulkUpsert = (keys, items) =>
      table.bulkGet(keys).then((values) =>
        table.bulkPut(
          values.map((value, index) => ({
            ...value,
            ...items[index],
          })),
        ),
      );

    return table;
  }
}

export const db = new TeruappDB();
