import React, { FunctionComponent } from 'react';

import { Link } from 'react-router-dom';

import { Card, makeStyles, Typography } from '@material-ui/core';

import { SongBookSummary } from '../../models/songBook';
import { joinUrls } from '../../helpers/url';

export interface SongBooksProps {
  baseUrl: string;
  items: SongBookSummary[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songBookLink: {
    textDecoration: 'none',
    margin: theme.spacing(1),
  },
  songBook: {
    width: 320,
    height: 96,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    willChange: 'transform',
    transition: theme.transitions.create('transform', {
      duration: 300,
    }),

    '&:hover, &:active': {
      transform: 'scale(1.025)',
    },
  },
  songBookTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const SongBooks: FunctionComponent<SongBooksProps> = ({ baseUrl, items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {items.map(({ id, title }) => (
        <Link
          key={id}
          to={joinUrls(baseUrl, id, 'canti')}
          className={classes.songBookLink}
        >
          <Card className={classes.songBook}>
            <Typography
              variant="h6"
              component="h4"
              color="primary"
              className={classes.songBookTitle}
            >
              {title}
            </Typography>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SongBooks;
