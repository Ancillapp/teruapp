import React, { FunctionComponent, ReactNode, useEffect } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

import darkTheme from '../../themes/dark';
import lightTheme from '../../themes/light';
import { useThemeName } from '../../providers/ThemeNameProvider';

export interface TopbarLayoutProps {
  title?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  topbarContent?: ReactNode;
  onMenuButtonClick?(): void;
}

const tweakedDarkTheme = createMuiTheme({
  ...darkTheme,
  palette: {
    ...darkTheme.palette,
    primary: { main: '#424242' },
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
  title: {
    fontFamily: theme.typography.fontFamily,
    flex: '1 1 auto',
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
  onMenuButtonClick,
  children,
}) => {
  const theme = useTheme();

  const themeName = useThemeName();

  const classes = useStyles();

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {!isNarrow && typeof startAdornment === 'undefined' ? (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={onMenuButtonClick}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            startAdornment
          )}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
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

const themeColor = document.querySelector<HTMLMetaElement>(
  'meta[name="theme-color"]',
)!;

const TopbarLayout: FunctionComponent<TopbarLayoutProps> = (props) => {
  const themeName = useThemeName();

  const theme = themeName === 'dark' ? tweakedDarkTheme : tweakedLightTheme;

  useEffect(() => {
    themeColor.content = theme.palette.primary.main;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <TopbarLayoutTemplate {...props} />
    </ThemeProvider>
  );
};

export default TopbarLayout;
