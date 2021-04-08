import React, { FunctionComponent, ReactNode } from 'react';

import { Card, CardActions, CardContent, makeStyles } from '@material-ui/core';

export interface BannerProps {
  title?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: `0 auto ${theme.spacing(1)}`,
    borderRadius: 0,
  },
  container: {
    width: '100%',
    maxWidth: theme.breakpoints.width('md'),
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'spacw-between',
  },
  content: {
    flex: '0 0 auto',
    maxWidth: '100%',
  },
  actions: {
    flex: '1 1 auto',
    justifyContent: 'flex-end',
    color: theme.palette.text.secondary,
  },
}));

const Banner: FunctionComponent<BannerProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <CardContent className={classes.content}>{title}</CardContent>
        {children && (
          <CardActions className={classes.actions}>{children}</CardActions>
        )}
      </div>
    </Card>
  );
};

export default Banner;
