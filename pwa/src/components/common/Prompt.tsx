import React, { FunctionComponent, ReactNode } from 'react';

import { Card, CardActions, CardContent, makeStyles } from '@material-ui/core';

export interface PromptProps {
  title?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: theme.breakpoints.width('sm'),
    margin: `${theme.spacing(1)} auto 0`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  actions: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
}));

const Prompt: FunctionComponent<PromptProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>{title}</CardContent>
      {children && (
        <CardActions className={classes.actions}>{children}</CardActions>
      )}
    </Card>
  );
};

export default Prompt;
