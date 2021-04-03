import { SongBook } from '../../models/songBook';

import { useQuery } from '../fetching';

const useSongBookQuery = (id: string) => useQuery<SongBook>(`songbooks/${id}`);

export default useSongBookQuery;
