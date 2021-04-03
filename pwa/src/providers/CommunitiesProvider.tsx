import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import useCommunitiesQuery from '../hooks/data/useCommunitiesQuery';
import useSongBooksLazyQuery from '../hooks/data/useSongBooksLazyQuery';
import { Community } from '../models/community';
import { SongBookSummary } from '../models/songBook';

export const CommunitiesContext = createContext<
  | {
      communities?: Community[];
      selectedCommunity?: Community | null;
      selectedCommunitySongBooks?: SongBookSummary[];
      setSelectedCommunity(newCommunity: Community): void;
    }
  | undefined
>(undefined);

export const CommunitiesProvider: FunctionComponent = ({ children }) => {
  const { loading, data } = useCommunitiesQuery();

  const [getSongBooks] = useSongBooksLazyQuery();

  // TODO: store this value in indexedDB
  const [selectedCommunity, setSelectedCommunity] = useState<
    Community | null | undefined
  >();

  const [selectedCommunitySongBooks, setSelectedCommunitySongBooks] = useState<
    SongBookSummary[] | undefined
  >();

  // This is just to simulate asynchronously getting the variable from IDB
  useEffect(() => {
    setSelectedCommunity(null);
  }, []);

  useEffect(() => {
    const updateSongBooks = async () => {
      if (selectedCommunity) {
        const songBooks = await getSongBooks({
          community: selectedCommunity.id,
        });
        setSelectedCommunitySongBooks(songBooks);
      }
    };

    updateSongBooks();
  }, [selectedCommunity]);

  return (
    <CommunitiesContext.Provider
      value={{
        communities: loading || !data ? undefined : data,
        selectedCommunity,
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
