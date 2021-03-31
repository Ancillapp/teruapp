import { Community } from '../models/community';

import useQuery from './useQuery';

const useCommunitiesQuery = () => useQuery<Community[]>('communities');

export default useCommunitiesQuery;
