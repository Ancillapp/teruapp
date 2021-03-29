import type { ObjectId } from 'mongodb';

export interface MongoDBRecord {
  _id: ObjectId;
}

export interface Song extends MongoDBRecord {
  title: string;
  language: string;
  content: string;
  category: string;
  songBooks: {
    id: ObjectId;
    number: string;
  }[];
}

export interface SongBook extends MongoDBRecord {
  id: string;
  title: string;
}

export interface Community extends MongoDBRecord {
  id: string;
  name: string;
  songBooks: {
    id: ObjectId;
  }[];
}
