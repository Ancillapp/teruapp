import React, { FunctionComponent } from 'react';

import { Redirect, useRouteMatch } from 'react-router-dom';

import TopbarLayout from '../../components/common/TopbarLayout';
import { useCommunities } from '../../providers/CommunitiesProvider';
import PageSkeleton from '../../components/common/PageSkeleton';
import SongBooks from '../../components/songBooks/SongBooks';
import { joinUrls } from '../../helpers/url';

const SongBooksList: FunctionComponent = () => {
  const { url } = useRouteMatch();

  const { selectedCommunitySongBooks } = useCommunities();

  if (!selectedCommunitySongBooks) {
    return <PageSkeleton />;
  }

  return selectedCommunitySongBooks.length === 1 ? (
    <Redirect to={joinUrls(url, selectedCommunitySongBooks[0].id, 'canti')} />
  ) : (
    <TopbarLayout title="Libri dei canti">
      <SongBooks baseUrl={url} items={selectedCommunitySongBooks} />
    </TopbarLayout>
  );
};

export default SongBooksList;
