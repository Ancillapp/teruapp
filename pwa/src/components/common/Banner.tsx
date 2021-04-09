import React, { FunctionComponent, ReactNode } from 'react';

import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

export interface BannerProps {
  icon?: ReactNode;
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
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '50%',
  },
  actions: {
    flex: '1 1 auto',
    justifyContent: 'flex-end',
    color: theme.palette.text.secondary,
  },
}));

const Banner: FunctionComponent<BannerProps> = ({ icon, title, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <div className={classes.container}>
        <CardContent className={classes.content}>
          {icon && <div className={classes.icon}>{icon}</div>}
          <Typography>{title}</Typography>
        </CardContent>
        {children && (
          <CardActions className={classes.actions}>{children}</CardActions>
        )}
      </div>
    </Card>
  );
};

export default Banner;
