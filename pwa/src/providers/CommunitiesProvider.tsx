import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import useCommunitiesQuery from '../hooks/data/useCommunitiesQuery';
import useSongBooksQuery from '../hooks/data/useSongBooksQuery';
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

  const { data: communities } = useCommunitiesQuery();

  const { data: songBooks } = useSongBooksQuery(
    { community: selectedCommunity?.id },
    { enable: !!selectedCommunity },
  );

  const [selectedCommunitySongBooks, setSelectedCommunitySongBooks] = useState<
    SongBookSummary[] | undefined
  >();

  useEffect(() => {
    setSelectedCommunitySongBooks(undefined);
  }, [selectedCommunity]);

  useEffect(() => {
    setSelectedCommunitySongBooks(songBooks);
  }, [songBooks]);

  return (
    <CommunitiesContext.Provider
      value={{
        communities,
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
