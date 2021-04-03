import React, { FunctionComponent } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { IconButton, Typography } from '@material-ui/core';
import { ArrowBackRounded as ArrowBackIcon } from '@material-ui/icons';

import TopbarLayout from '../../components/common/TopbarLayout';
import PageSkeleton from '../../components/common/PageSkeleton';
import useSongBookQuery from '../../hooks/data/useSongBookQuery';
import TopbarIcon from '../../components/common/TopbarIcon';
import Songs from '../../components/songs/Songs';
import { useCommunities } from '../../providers/CommunitiesProvider';

const SongsList: FunctionComponent = () => {
  const {
    url,
    params: { songBookId },
  } = useRouteMatch<{ songBookId: string }>();

  const { selectedCommunitySongBooks } = useCommunities();

  const { loading, data } = useSongBookQuery(songBookId);

  return loading || !data || !selectedCommunitySongBooks ? (
    <PageSkeleton />
  ) : (
    <TopbarLayout
      title={data.title}
      startAdornment={
        selectedCommunitySongBooks.length > 1 ? (
          <TopbarIcon sx={{ mr: 0.5 }}>
            <Link to="..">
              <IconButton color="inherit" edge="start" aria-label="indietro">
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </TopbarIcon>
        ) : undefined
      }
    >
      {data.songs.length > 0 ? (
        <Songs baseUrl={url} items={data.songs} />
      ) : (
        <Typography variant="subtitle2" padding={2}>
          Nessun risultato.
        </Typography>
      )}
    </TopbarLayout>
  );
};

export default SongsList;
