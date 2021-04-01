import React, { FunctionComponent } from 'react';

import { Redirect, useRouteMatch } from 'react-router-dom';

import TopbarLayout from '../../components/common/TopbarLayout';
import Loader from '../../components/common/Loader';
import useSongBooksQuery from '../../hooks/useSongBooksQuery';
import { useCommunities } from '../../providers/CommunitiesProvider';
import PageSkeleton from '../../components/common/PageSkeleton';

const SongBooksList: FunctionComponent = () => {
  const { path } = useRouteMatch();

  const { selectedCommunity } = useCommunities();

  const { loading, data } = useSongBooksQuery({
    community: selectedCommunity?.id,
  });

  if (loading || !data) {
    return <PageSkeleton />;
  }

  return data.length === 1 ? (
    <Redirect to={`${path}/${data[0].id}/canti`} />
  ) : (
    <TopbarLayout title="Libri dei canti">
      <Loader />
    </TopbarLayout>
  );
};

export default SongBooksList;
