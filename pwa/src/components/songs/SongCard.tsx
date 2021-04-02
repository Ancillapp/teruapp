import React, { FunctionComponent } from 'react';

import { Link, LinkProps } from 'react-router-dom';

import clsx from 'clsx';

import {
  Card,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { SongBookSong } from '../../models/songBook';

export interface SongCardProps extends Omit<LinkProps, 'to'> {
  baseUrl: string;
  song: SongBookSong;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
    margin: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

const SongCard: FunctionComponent<SongCardProps> = ({
  baseUrl,
  song,
  className,
  ...props
}) => {
  const theme = useTheme();

  const classes = useStyles();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Link
      to={`${baseUrl}/${song.id}`}
      className={clsx(classes.root, className)}
      {...props}
    >
      <Card className={classes.card}>
        <Typography
          variant={isDesktop ? 'h2' : 'h4'}
          component="h4"
          align="center"
        >
          {song.number}
        </Typography>
        {isDesktop && (
          <Typography variant="h6" align="center" color="primary">
            {song.title}
          </Typography>
        )}
      </Card>
    </Link>
  );
};

export default SongCard;
