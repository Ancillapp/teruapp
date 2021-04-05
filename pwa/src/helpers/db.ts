import Dexie, { Table } from 'dexie';

class TeruappDB extends Dexie {
  settings: Table<{ key: string; value: unknown }, string>;

  constructor() {
    super('teruapp');

    // Dexie multiplies DB version number by 10,
    // so we set the version number divided by 10
    this.version(0.1).stores({
      settings: 'key',
    });

    this.settings = this.table('settings');
  }
}

export const db = new TeruappDB();
