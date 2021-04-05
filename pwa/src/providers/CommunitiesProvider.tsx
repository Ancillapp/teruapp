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
import useSetting from '../hooks/useSetting';

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
  const [selectedCommunity, setSelectedCommunity] = useSetting<Community>(
    'community',
  );

  const { loading, data } = useCommunitiesQuery();

  const [getSongBooks] = useSongBooksLazyQuery();

  const [selectedCommunitySongBooks, setSelectedCommunitySongBooks] = useState<
    SongBookSummary[] | undefined
  >();

  useEffect(() => {
    const updateSongBooks = async () => {
      setSelectedCommunitySongBooks(undefined);

      if (selectedCommunity) {
        const songBooks = await getSongBooks({
          community: selectedCommunity.id,
        });
        setSelectedCommunitySongBooks(songBooks);
      }
    };

    updateSongBooks();
  }, [getSongBooks, selectedCommunity]);

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
