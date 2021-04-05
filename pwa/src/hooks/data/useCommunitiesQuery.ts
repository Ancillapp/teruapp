import { useLiveQuery } from 'dexie-react-hooks';

import { Community } from '../../models/community';
import { db } from '../../helpers/db';

import { useQuery } from '../fetching';
import { useEffect } from 'react';

const useCommunitiesQuery = () => {
  const communities = useLiveQuery(() => db.communities.toArray());

  const { data, ...rest } = useQuery<Community[]>('communities');

  useEffect(() => {
    if (data) {
      if (communities) {
        const deletedCommunities = communities.filter((community) =>
          data.every(({ id }) => id !== community.id),
        );

        db.communities.bulkDelete(deletedCommunities.map(({ id }) => id));
      }

      db.communities.bulkPut(data);
    }
    // We don't want to add communities to the dependencies to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data: communities, ...rest };
};

export default useCommunitiesQuery;
