import React, { FunctionComponent, useMemo } from 'react';

import { makeStyles } from '@material-ui/core';

import { compileSong } from '../../helpers/compilers';
import { SongBookSong } from '../../models/song';

import Page from '../common/Page';

export interface SongLyricsProps {
  song: SongBookSong;
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

const SongLyrics: FunctionComponent<SongLyricsProps> = ({
  song: { content },
}) => {
  const classes = useStyles();

  const compiledSong = useMemo(() => compileSong(content, { classes }), [
    classes,
    content,
  ]);

  return (
    <Page
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: compiledSong }}
    />
  );
};

export default SongLyrics;
