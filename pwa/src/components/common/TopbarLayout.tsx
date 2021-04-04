import React, { FunctionComponent, ReactNode } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import { MenuRounded as MenuIcon } from '@material-ui/icons';

import darkTheme from '../../themes/dark';
import lightTheme from '../../themes/light';
import { useThemeName } from '../../providers/ThemeNameProvider';
import { useMenu } from '../../providers/MenuProvider';

export interface TopbarLayoutProps {
  title?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  topbarContent?: ReactNode;
}

const tweakedDarkTheme = createMuiTheme({
  ...darkTheme,
  palette: {
    ...darkTheme.palette,
    primary: { main: '#2a2a2a' },
  },
});

const tweakedLightTheme = createMuiTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: 'dark',
    text: { primary: '#fff' },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    flex: '0 0 auto',
    zIndex: 10,
  },
  content: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
  },
  toolbar: theme.mixins.toolbar,
  titleContainer: {
    flex: '1 1 auto',

    '& > *': {
      fontFamily: theme.typography.fontFamily,
      margin: 0,
    },
  },
  menu: {
    width: 'min(100vw - 56px, 280px)',

    [theme.breakpoints.up('sm')]: {
      width: 'min(100vw - 64px, 320px)',
    },
  },
}));

const TopbarLayoutTemplate: FunctionComponent<TopbarLayoutProps> = ({
  title = 'Teruapp',
  startAdornment,
  endAdornment,
  topbarContent,
  children,
}) => {
  const themeName = useThemeName();

  const classes = useStyles();

  const { toggle } = useMenu();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {typeof startAdornment === 'undefined' ? (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => toggle()}
              className={classes.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            startAdornment
          )}
          <div className={classes.titleContainer}>
            {typeof title === 'string' ? (
              <Typography variant="h6">{title}</Typography>
            ) : (
              title
            )}
          </div>
          {endAdornment}
        </Toolbar>

        {topbarContent}
      </AppBar>

      <ThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
        <div className={classes.content}>{children}</div>
      </ThemeProvider>
    </div>
  );
};

const TopbarLayout: FunctionComponent<TopbarLayoutProps> = (props) => {
  const themeName = useThemeName();

  const theme = themeName === 'dark' ? tweakedDarkTheme : tweakedLightTheme;

  return (
    <ThemeProvider theme={theme}>
      <TopbarLayoutTemplate {...props} />
    </ThemeProvider>
  );
};

export default TopbarLayout;
