export interface SongBookSummary {
  id: string;
  title: string;
}

export interface SongBookSong {
  id: string;
  number: string;
  title: string;
  language: string;
  category: string;
  content?: string;
}

export interface SongBook extends SongBookSummary {
  songs: SongBookSong[];
}
