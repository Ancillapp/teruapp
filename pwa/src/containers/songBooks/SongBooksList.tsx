import React, { FunctionComponent } from 'react';

import { Redirect, useRouteMatch } from 'react-router-dom';

import TopbarLayout from '../../components/common/TopbarLayout';
import Loader from '../../components/common/Loader';
import { useCommunities } from '../../providers/CommunitiesProvider';
import PageSkeleton from '../../components/common/PageSkeleton';

const SongBooksList: FunctionComponent = () => {
  const { path } = useRouteMatch();

  const { selectedCommunitySongBooks } = useCommunities();

  if (!selectedCommunitySongBooks) {
    return <PageSkeleton />;
  }

  return selectedCommunitySongBooks.length === 1 ? (
    <Redirect to={`${path}/${selectedCommunitySongBooks[0].id}/canti`} />
  ) : (
    <TopbarLayout title="Libri dei canti">
      <Loader />
    </TopbarLayout>
  );
};

export default SongBooksList;
