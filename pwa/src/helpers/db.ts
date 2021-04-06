import Dexie, { Table } from 'dexie';
import { Community } from '../models/community';
import { SongBookSummary } from '../models/songBook';
import { Song } from '../models/song';

export interface DBSetting {
  key: string;
  value: unknown;
}

export type DBCommunity = Community;

export interface DBSongBook extends SongBookSummary {
  songs: {
    id: string;
    number: string;
  }[];
}

export interface DBSong extends Omit<Song, 'content'> {
  content?: string;
}

class TeruappDB extends Dexie {
  settings: Table<DBSetting, string>;
  communities: Table<DBCommunity, string>;
  songBooks: Table<DBSongBook, string>;
  songs: Table<DBSong, string>;

  constructor() {
    super('teruapp');

    // Dexie multiplies DB version number by 10,
    // so we set the version number divided by 10
    this.version(0.1).stores({
      settings: 'key',
      communities: 'id',
      songBooks: 'id',
      songs: 'id, category, language, *songBooks',
    });

    this.settings = this.table('settings');
    this.communities = this.table('communities');
    this.songBooks = this.table('songBooks');
    this.songs = this.table('songs');
  }
}

export const db = new TeruappDB();
