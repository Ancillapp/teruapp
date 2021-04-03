export interface Song {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface SongBookSong extends Song {
  number: string;
}
