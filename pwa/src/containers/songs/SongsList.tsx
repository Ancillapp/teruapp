import React, { FunctionComponent } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Button, IconButton, Typography } from '@material-ui/core';
import { ArrowBackRounded as ArrowBackIcon } from '@material-ui/icons';

import TopbarLayout from '../../components/common/TopbarLayout';
import PageSkeleton from '../../components/common/PageSkeleton';
import useSongBookQuery from '../../hooks/data/useSongBookQuery';
import TopbarIcon from '../../components/common/TopbarIcon';
import Songs from '../../components/songs/Songs';
import { useCommunities } from '../../providers/CommunitiesProvider';
import Prompt from '../../components/common/Prompt';
import useSongsDownloadPreferencesPrompt from '../../hooks/useSongsDownloadPreferencesPrompt';

const SongsList: FunctionComponent = () => {
  const {
    url,
    params: { songBookId },
  } = useRouteMatch<{ songBookId: string }>();

  const { selectedCommunity, selectedCommunitySongBooks } = useCommunities();

  const {
    open: songsDownloadPromptOpen,
    preference: songsDownloadPreference,
    updatePreference: updateSongsDownloadPreference,
  } = useSongsDownloadPreferencesPrompt();

  const { data } = useSongBookQuery(
    songBookId,
    { fullData: songsDownloadPreference === 'yes' },
    {
      enable: typeof songsDownloadPreference !== 'undefined',
    },
  );

  return !data || !selectedCommunity || !selectedCommunitySongBooks ? (
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

      {songsDownloadPromptOpen && (
        <Prompt title="Vuoi scaricare i canti di questa comunità in modo da poterli consultare anche offline?">
          <Button
            color="inherit"
            onClick={() => updateSongsDownloadPreference('never')}
          >
            Non chiedermelo più
          </Button>
          <Button
            color="inherit"
            onClick={() => updateSongsDownloadPreference('no')}
          >
            No, grazie
          </Button>
          <Button
            color="primary"
            onClick={() => updateSongsDownloadPreference('yes')}
          >
            Certo!
          </Button>
        </Prompt>
      )}
    </TopbarLayout>
  );
};

export default SongsList;
