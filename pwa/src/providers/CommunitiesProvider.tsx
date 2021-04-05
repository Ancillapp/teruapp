import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useLiveQuery } from 'dexie-react-hooks';

import useCommunitiesQuery from '../hooks/data/useCommunitiesQuery';
import useSongBooksLazyQuery from '../hooks/data/useSongBooksLazyQuery';
import { Community } from '../models/community';
import { SongBookSummary } from '../models/songBook';
import { db } from '../helpers/db';

export interface CommunitiesContextValue {
  communities?: Community[];
  selectedCommunity?: Community | null;
  selectedCommunitySongBooks?: SongBookSummary[];
  setSelectedCommunity(newCommunity: Community): void;
}

export const CommunitiesContext = createContext<
  CommunitiesContextValue | undefined
>(undefined);

export const CommunitiesProvider: FunctionComponent = ({ children }) => {
  const community = useLiveQuery(() => db.settings.get('community'));

  const { loading, data } = useCommunitiesQuery();

  const [getSongBooks] = useSongBooksLazyQuery();

  const [selectedCommunitySongBooks, setSelectedCommunitySongBooks] = useState<
    SongBookSummary[] | undefined
  >();

  const setSelectedCommunity = useCallback<
    CommunitiesContextValue['setSelectedCommunity']
  >((newCommunity) => {
    db.settings.put({ key: 'community', value: newCommunity });
  }, []);

  useEffect(() => {
    const updateSongBooks = async () => {
      setSelectedCommunitySongBooks(undefined);

      if (community) {
        const songBooks = await getSongBooks({
          community: (community.value as Community).id,
        });
        setSelectedCommunitySongBooks(songBooks);
      }
    };

    updateSongBooks();
  }, [community, getSongBooks]);

  return (
    <CommunitiesContext.Provider
      value={{
        communities: loading || !data ? undefined : data,
        selectedCommunity: (community?.value as Community) || null,
        setSelectedCommunity,
        selectedCommunitySongBooks,
      }}
    >
      {children}
    </CommunitiesContext.Provider>
  );
};

export const useCommunities = () => {
  const context = useContext(CommunitiesContext);

  if (!context) {
    throw new Error('useCommunities must be used within a CommunitiesProvider');
  }

  return context;
};

export default CommunitiesProvider;
