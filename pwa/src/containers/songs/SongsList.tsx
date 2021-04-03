import React, { FunctionComponent } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { IconButton, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import TopbarLayout from '../../components/common/TopbarLayout';
import PageSkeleton from '../../components/common/PageSkeleton';
import useSongBookQuery from '../../hooks/data/useSongBookQuery';
import TopbarIcon from '../../components/common/TopbarIcon';
import SongCard from '../../components/songs/SongCard';
import CenteredLayout from '../../components/common/CenteredLayout';
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
      <CenteredLayout>
        {data.songs.length > 0 ? (
          <AutoSizer>
            {({ width, height }) => {
              const itemWidth = Math.floor(width / 5);
              const itemHeight = Math.floor((itemWidth / 2) * 3);

              return (
                <FixedSizeGrid
                  width={width}
                  height={height}
                  columnCount={5}
                  rowCount={Math.ceil(data.songs.length / 5)}
                  columnWidth={itemWidth}
                  rowHeight={itemHeight}
                >
                  {({ rowIndex, columnIndex, style }) => {
                    const song = data.songs[rowIndex * 5 + columnIndex];

                    return song ? (
                      <SongCard
                        key={song.id}
                        baseUrl={url}
                        song={song}
                        style={style}
                      />
                    ) : null;
                  }}
                </FixedSizeGrid>
              );
            }}
          </AutoSizer>
        ) : (
          <Typography variant="subtitle2" padding={2}>
            Nessun risultato.
          </Typography>
        )}
      </CenteredLayout>
    </TopbarLayout>
  );
};

export default SongsList;
