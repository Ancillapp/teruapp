export interface Song {
  id: string;
  title: string;
  language: string;
  content: string;
  category: string;
}

export interface SongBookSong extends Song {
  number: string;
}
