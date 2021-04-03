import React, { FunctionComponent, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import clsx from 'clsx';

import {
  Card,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { SongBookSong } from '../../models/songBook';

export interface SongsProps {
  baseUrl: string;
  items: SongBookSong[];
}

interface SongsRowProps extends Omit<ListChildComponentProps, 'data'> {
  data: { width: number; height: number };
}

const useStyles = makeStyles((theme) => ({
  songsContainer: {
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  },
  songsRow: {
    display: 'grid',
    placeItems: 'center',
    gridTemplateColumns: 'repeat(5, 1fr)',
    width: '100%',
    maxWidth: theme.breakpoints.width('md'),
    margin: '0 auto',
  },
  songLink: {
    textDecoration: 'none',
    margin: theme.spacing(1),
  },
  mobileSongLink: {
    display: 'flex',
    alignItems: 'center',
  },
  mobileSongTitle: {
    marginLeft: theme.spacing(1),
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  song: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    width: '100%',
    height: '100%',
    willChange: 'transform',
    transition: theme.transitions.create('transform', {
      duration: 300,
    }),

    '&:hover, &:active': {
      transform: 'scale(1.025)',
    },
  },
}));

const Songs: FunctionComponent<SongsProps> = ({ baseUrl, items }) => {
  const theme = useTheme();

  const classes = useStyles();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const songsPerRow = isDesktop ? 5 : 1;

  const MobileSongRow = useCallback<FunctionComponent<SongsRowProps>>(
    ({ style, index, data: { width, height } }) => (
      <div style={style}>
        <div className={classes.songsRow} style={{ height }}>
          {[...Array(songsPerRow)].map((_, subindex) => {
            const song = items[index * songsPerRow + subindex];

            return (
              song && (
                <Link
                  to={`${baseUrl}/${song.id}`}
                  key={song.id}
                  className={clsx(classes.songLink, classes.mobileSongLink)}
                  style={{
                    width: width - Number(theme.spacing(2).slice(0, -2)),
                    height: height - Number(theme.spacing(2).slice(0, -2)),
                  }}
                >
                  <Card
                    className={classes.song}
                    style={{
                      width: Math.floor((height / 3) * 2),
                    }}
                  >
                    <Typography
                      variant={isDesktop ? 'h2' : 'h4'}
                      component="h4"
                      align="center"
                    >
                      {song.number.replace('bis', 'b')}
                    </Typography>
                  </Card>
                  <Typography
                    variant="h6"
                    align="center"
                    color="primary"
                    className={classes.mobileSongTitle}
                  >
                    {song.title}
                  </Typography>
                </Link>
              )
            );
          })}
        </div>
      </div>
    ),
    [
      baseUrl,
      classes.mobileSongLink,
      classes.mobileSongTitle,
      classes.song,
      classes.songLink,
      classes.songsRow,
      isDesktop,
      items,
      songsPerRow,
      theme,
    ],
  );

  const DesktopSongsRow = useCallback<FunctionComponent<SongsRowProps>>(
    ({ style, index, data: { width, height } }) => (
      <div style={style}>
        <div className={classes.songsRow} style={{ height }}>
          {[...Array(songsPerRow)].map((_, subindex) => {
            const song = items[index * songsPerRow + subindex];

            return (
              song && (
                <Link
                  to={`${baseUrl}/${song.id}`}
                  key={song.id}
                  className={classes.songLink}
                  style={{
                    width: width - Number(theme.spacing(2).slice(0, -2)),
                    height: height - Number(theme.spacing(2).slice(0, -2)),
                  }}
                >
                  <Card className={classes.song}>
                    <Typography
                      variant={isDesktop ? 'h2' : 'h4'}
                      component="h4"
                      align="center"
                    >
                      {song.number.replace('bis', 'b')}
                    </Typography>
                    <Typography variant="h6" align="center" color="primary">
                      {song.title}
                    </Typography>
                  </Card>
                </Link>
              )
            );
          })}
        </div>
      </div>
    ),
    [
      baseUrl,
      classes.song,
      classes.songLink,
      classes.songsRow,
      isDesktop,
      items,
      songsPerRow,
      theme,
    ],
  );

  return (
    <div className={classes.songsContainer}>
      <AutoSizer>
        {({ width, height }) => {
          const maxWidth = Math.min(width, theme.breakpoints.width('md'));

          const itemWidth = Math.floor(maxWidth / songsPerRow);
          const itemHeight = Math.floor(
            (Math.floor(maxWidth / (isDesktop ? songsPerRow : 5)) / 2) * 3,
          );

          return (
            <FixedSizeList
              width={width}
              height={height}
              itemCount={Math.ceil(items.length / songsPerRow)}
              itemSize={itemHeight}
              itemData={{ width: itemWidth, height: itemHeight }}
            >
              {isDesktop ? DesktopSongsRow : MobileSongRow}
            </FixedSizeList>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default Songs;
