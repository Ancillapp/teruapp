import React, { FunctionComponent, memo } from 'react';

import { makeStyles, Skeleton, Typography } from '@material-ui/core';

import { compileSong } from '../../helpers/compilers';
import { SongBookSong } from '../../models/song';

export interface SongLyricsProps {
  song?: SongBookSong;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& strong': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

const SongLyrics: FunctionComponent<SongLyricsProps> = ({ song }) => {
  const classes = useStyles();

  return song ? (
    <Typography
      variant="h6"
      className={classes.root}
      dangerouslySetInnerHTML={{
        __html: compileSong(`${song.number}. ${song.title}`, { wrap: false }),
      }}
    />
  ) : (
    <Skeleton variant="text" width={192} />
  );
};

export default memo(SongLyrics);
