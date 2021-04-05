import Dexie, { Table } from 'dexie';
import { Community } from '../models/community';

class TeruappDB extends Dexie {
  settings: Table<{ key: string; value: unknown }, string>;
  communities: Table<Community, string>;

  constructor() {
    super('teruapp');

    // Dexie multiplies DB version number by 10,
    // so we set the version number divided by 10
    this.version(0.1).stores({
      settings: 'key',
      communities: 'id',
    });

    this.settings = this.table('settings');
    this.communities = this.table('communities');
  }
}

export const db = new TeruappDB();
