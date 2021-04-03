import { Community } from '../../models/community';

import { useQuery } from '../fetching';

const useCommunitiesQuery = () => useQuery<Community[]>('communities');

export default useCommunitiesQuery;
