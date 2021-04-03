import React, { FunctionComponent } from 'react';

import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import Page from '../../components/common/Page';
import PageSkeleton from '../../components/common/PageSkeleton';
import TopbarIcon from '../../components/common/TopbarIcon';
import TopbarLayout from '../../components/common/TopbarLayout';
import useSongQuery from '../../hooks/data/useSongQuery';

const SongDetails: FunctionComponent = () => {
  const {
    params: { songBookId, songId },
  } = useRouteMatch<{ songBookId: string; songId: string }>();

  const { loading, data } = useSongQuery(songBookId, songId);

  return loading || !data ? (
    <PageSkeleton />
  ) : (
    <TopbarLayout
      title={`${data.number}. ${data.title}`}
      startAdornment={
        <TopbarIcon sx={{ mr: 0.5 }}>
          <Link to="..">
            <IconButton color="inherit" edge="start" aria-label="indietro">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </TopbarIcon>
      }
    >
      <Page>{data.content}</Page>
    </TopbarLayout>
  );
};

export default SongDetails;
