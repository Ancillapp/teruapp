import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import useCommunitiesQuery from '../hooks/useCommunitiesQuery';
import { Community } from '../models/community';

export const CommunitiesContext = createContext<
  | {
      communities?: Community[];
      selectedCommunity?: Community | null;
      setSelectedCommunity(newCommunity: Community): void;
    }
  | undefined
>(undefined);

export const CommunitiesProvider: FunctionComponent = ({ children }) => {
  const { loading, data } = useCommunitiesQuery();

  // TODO: store this value in indexedDB
  const [selectedCommunity, setSelectedCommunity] = useState<
    Community | null | undefined
  >();

  // This is just to simulate asynchronously getting the variable from IDB
  useEffect(() => {
    setSelectedCommunity(null);
  }, []);

  return (
    <CommunitiesContext.Provider
      value={{
        communities: loading || !data ? undefined : data,
        selectedCommunity,
        setSelectedCommunity,
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
