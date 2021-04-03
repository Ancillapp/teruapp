import React, { FunctionComponent, useMemo } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { compileSong } from '../../helpers/compilers';
import { SongBookSong } from '../../models/song';

export interface SongLyricsProps {
  song: SongBookSong;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& strong': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

const SongLyrics: FunctionComponent<SongLyricsProps> = ({
  song: { number, title },
}) => {
  const classes = useStyles();

  const compiledTitle = useMemo(
    () => compileSong(`${number}. ${title}`, { wrap: false }),
    [number, title],
  );

  return (
    <Typography
      variant="h6"
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: compiledTitle }}
    />
  );
};

export default SongLyrics;
