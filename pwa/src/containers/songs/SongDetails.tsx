import React, { FunctionComponent } from 'react';

import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { IconButton } from '@material-ui/core';
import { ArrowBackRounded as ArrowBackIcon } from '@material-ui/icons';

import PageSkeleton from '../../components/common/PageSkeleton';
import TopbarIcon from '../../components/common/TopbarIcon';
import TopbarLayout from '../../components/common/TopbarLayout';
import useSongQuery from '../../hooks/data/useSongQuery';
import SongTitle from '../../components/songs/SongTitle';
import SongLyrics from '../../components/songs/SongLyrics';

const SongDetails: FunctionComponent = () => {
  const {
    params: { songBookId, songId },
  } = useRouteMatch<{ songBookId: string; songId: string }>();

  const { loading, data } = useSongQuery(songBookId, songId);

  return loading || !data ? (
    <PageSkeleton />
  ) : (
    <TopbarLayout
      title={<SongTitle song={data} />}
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
      <SongLyrics song={data} />
    </TopbarLayout>
  );
};

export default SongDetails;
