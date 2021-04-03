import { SongBookSong } from '../../models/song';

import { useQuery } from '../fetching';

const useSongQuery = (songBookId: string, songId: string) =>
  useQuery<SongBookSong>(`songbooks/${songBookId}/songs/${songId}`);

export default useSongQuery;
