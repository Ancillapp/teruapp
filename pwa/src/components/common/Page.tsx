import React, { FunctionComponent } from 'react';

import { Box, BoxProps, makeStyles, Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface PageProps extends BoxProps {
  size?: number | Breakpoint;
}

const useStyles = makeStyles<Theme, PageProps>((theme) => ({
  root: ({ size = 'sm' }) => ({
    margin: 0,
    width: '100%',
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'stretch',

    [theme.breakpoints.up('md')]: {
      flex: '0 0 auto',
      margin: theme.spacing(3),
      width: `calc(100% - ${theme.spacing(6)})`,
    },

    '& p': {
      textAlign: 'justify',
    },

    '& h1, h2, h3, h4, h5, h6': {
      margin: '0.75rem 0 0.25rem',
    },

    '& > *': {
      padding: '1rem 1.5rem',
      background: theme.palette.background.paper,
      width: '100%',
      maxWidth: typeof size === 'number' ? size : theme.breakpoints.width(size),
      margin: '0 auto',

      [theme.breakpoints.up('md')]: {
        padding: '2rem 3rem',
        borderRadius: '.5rem',
        boxShadow:
          '0 .06rem .065rem 0 rgba(0, 0, 0, 0.14), 0 .003rem .15rem 0 rgba(0, 0, 0, 0.12), 0 .09rem .0035rem -.065rem rgba(0, 0, 0, 0.2)',
      },
    },
  }),
}));

const Page: FunctionComponent<PageProps> = ({ children, ...props }) => {
  const classes = useStyles(props);

  return (
    <Box className={classes.root}>
      <Box component="section" {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default Page;
