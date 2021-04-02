import { SongBook } from '../models/songBook';

import useQuery from './useQuery';

const useSongBookQuery = (id: string) => useQuery<SongBook>(`songbooks/${id}`);

export default useSongBookQuery;
