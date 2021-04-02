export interface SongBookSummary {
  id: string;
  title: string;
}

export interface SongBookSong {
  id: string;
  number: string;
  title: string;
  category: string;
}

export interface SongBook extends SongBookSummary {
  songs: SongBookSong[];
}
