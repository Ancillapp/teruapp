import React, { FunctionComponent, memo } from 'react';

import { makeStyles, Skeleton, Typography } from '@material-ui/core';

import { compileSong } from '../../helpers/compilers';
import { SongBookSong } from '../../models/song';

import Page from '../common/Page';

export interface SongLyricsProps {
  song?: SongBookSong;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& p': {
      fontSize: '1rem',
      textAlign: 'left',
      margin: '1rem 0',
    },
    '& strong': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  bridge: {
    fontStyle: 'italic',
  },
  chorus: {
    fontWeight: theme.typography.fontWeightBold,
  },
  ending: {},
  verse: {},
}));

const SongLyrics: FunctionComponent<SongLyricsProps> = ({ song }) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      {...(song && {
        dangerouslySetInnerHTML: {
          __html: compileSong(song.content, { classes }),
        },
      })}
    >
      {song
        ? null
        : Array.from(
            { length: Math.round(Math.random() * 3 + 2) },
            (_, index) => (
              <Typography key={index}>
                {Array.from(
                  { length: Math.round(Math.random() * 2 + 3) },
                  (_, subindex) => (
                    <Skeleton
                      key={`${index}-${subindex}`}
                      variant="text"
                      width={Math.random() * 128 + 128}
                    />
                  ),
                )}
              </Typography>
            ),
          )}
    </Page>
  );
};

export default memo(SongLyrics);
