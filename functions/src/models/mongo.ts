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
    // We replicate this information here because the number of reads
    // is much higher than the number of writes, so it is better to
    // replicate the information and update it when needed instead of
    // having to do some joins when reading the data
    title: string;
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
    // We replicate this information here because the number of reads
    // is much higher than the number of writes, so it is better to
    // replicate the information and update it when needed instead of
    // having to do some joins when reading the data
    title: string;
  }[];
}
