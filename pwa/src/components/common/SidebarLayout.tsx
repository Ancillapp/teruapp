import React, { FunctionComponent, ReactNode } from 'react';

import clsx from 'clsx';

import {
  Drawer,
  Toolbar,
  makeStyles,
  useMediaQuery,
  useTheme,
  Divider,
  DrawerProps,
  IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useThemeName } from '../../providers/ThemeNameProvider';

export interface SidebarLayoutProps extends DrawerProps {
  menuContent?: ReactNode;
  onToggle?(open: boolean): void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100%',
  },
  collapsedDrawer: {
    '& > div': {
      width: 64,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(0, 2.5),
  },
  logo: {
    height: '1.9rem',
    marginBottom: '0.6rem',
  },
  menu: {
    width: 'min(100vw - 56px, 280px)',

    [theme.breakpoints.up('sm')]: {
      width: 'min(100vw - 64px, 320px)',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(-1.5),
    marginRight: theme.spacing(2.5),
  },
  content: {
    width: '100vw',
    minHeight: '100vh',
    float: 'right',
    position: 'relative',

    [theme.breakpoints.up('sm')]: {
      width: 'calc(100vw - min(100vw - 64px, 320px))',
    },
  },
  expandedContent: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100vw - 64px)',
    },
  },
}));

const SidebarLayout: FunctionComponent<SidebarLayoutProps> = ({
  menuContent,
  open,
  children,
  className,
  onToggle,
  ...props
}) => {
  const themeName = useThemeName();

  const theme = useTheme();

  const classes = useStyles();

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        variant={isNarrow ? 'permanent' : 'temporary'}
        open={isNarrow || open}
        className={clsx(!open && classes.collapsedDrawer, className)}
        onClose={() => onToggle?.(false)}
        {...props}
      >
        <Toolbar className={classes.toolbar}>
          {isNarrow && (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => onToggle?.(!open)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <svg
            viewBox="0 0 158.1 59.8"
            fill={
              themeName === 'dark'
                ? theme.palette.text.primary
                : theme.palette.primary.main
            }
            className={classes.logo}
          >
            <path d="M18.5 26.5a8.8 8.8 0 118.8-8.9 8.8 8.8 0 01-8.8 8.9V30A12.3 12.3 0 106.2 17.6 12.3 12.3 0 0018.5 30" />
            <path d="M14.1 51.1a.9.9 0 01-.9-.9l1.7-29L1 23H.9a.9.9 0 01-.9-.8v-8.9a.9.9 0 01.9-.8H1L14.9 14 13.2 1a.8.8 0 01.3-.7.9.9 0 01.6-.3H23a.9.9 0 01.7.3.9.9 0 01.2.7l-1.6 13L36 12.4a.9.9 0 011 .8v8.9a1 1 0 01-.3.6 1 1 0 01-.6.2H36l-14-1.6 1.7 29a.9.9 0 01-.3.6.9.9 0 01-.6.3z" />
            <path d="M34.4 43.8a4.2 4.2 0 001.8 3.4 5.4 5.4 0 003.5 1 11.5 11.5 0 002.9-.5 14.3 14.3 0 012.1-.6q1 0 1 1c0 .8-.9 1.6-2.4 2.3a10.7 10.7 0 01-4.8 1.2h-1a8.7 8.7 0 01-3.3-.6 8 8 0 01-4.6-4.4 10.1 10.1 0 01-1-4.1v-.9a11 11 0 01.8-3.8 8.6 8.6 0 014.5-5 9.9 9.9 0 014.1-.9h.5a7.7 7.7 0 015.3 2 7.1 7.1 0 011.8 2.5 7.8 7.8 0 01.6 3 2 2 0 01-1.5 2 29.8 29.8 0 01-7.8.7 3.7 3.7 0 00-2 .4 1.5 1.5 0 00-.5 1.3zm3.8-9.3h-.6a3.2 3.2 0 00-2.3 1.3 4.5 4.5 0 00-1.1 3v.3c0 .5.2.8.8.8h1.7l3.2-.2h.4c.7 0 1-.4 1-1V38a3.5 3.5 0 00-1-2.4 2.8 2.8 0 00-2-1.1zM62.4 32.5a2.8 2.8 0 012.2.7 2.5 2.5 0 01.6 1.7 3 3 0 01-.5 1.7 1.5 1.5 0 01-1.2.7 4.8 4.8 0 01-1.8-.5 4.8 4.8 0 00-1.8-.5 2.3 2.3 0 00-1.4.7 3.5 3.5 0 00-1 1.9 17.8 17.8 0 00-.4 3.9 9.5 9.5 0 00.4 3.4 9 9 0 001.5 2 3.5 3.5 0 011.2 2c0 .6-1.6 1-4.6 1h-4.1c-1.4 0-2-.4-2-1a2.5 2.5 0 011-1.7 4 4 0 001.2-1.6 28.4 28.4 0 00.3-5 26 26 0 00-.3-5.1 2.7 2.7 0 00-1.3-1.5c-.6-.3-1-.8-1-1.2 0-.6.5-1 1.4-1.3a14.5 14.5 0 013.6-.5 4.4 4.4 0 012.3.4 2.1 2.1 0 01.5 1c.2.5.4.8.7.8a1.9 1.9 0 00.7-.3 7.3 7.3 0 013.8-1.7zM89.2 49.7q0 1.5-4.5 1.5a3.2 3.2 0 01-1.8-.3 3 3 0 01-.8-1c-.2-.4-.4-.6-.6-.6a4.3 4.3 0 00-1.2.6 14.8 14.8 0 01-2 1.1 7.6 7.6 0 01-3 .5 5.7 5.7 0 01-3-.8 5.3 5.3 0 01-2-2.3c-.6-1-.8-3.2-.8-6.7a33.4 33.4 0 00-.2-5.7 2.5 2.5 0 00-1.3-1c-.7-.3-1-.7-1-1.1 0-.7.4-1 1.2-1.3a17.5 17.5 0 014.5-.5 1.6 1.6 0 011.7 1.1 27.3 27.3 0 01.4 6.3A36 36 0 0075 46a2.6 2.6 0 002 2.2 3 3 0 00.8 0 4.3 4.3 0 001.4-.2 3.7 3.7 0 001.8-1.3c.4-.6.7-2 .7-4.4a24.3 24.3 0 00-.4-5 7.8 7.8 0 00-1-2.4 3.2 3.2 0 01-.7-1.4q0-1.3 5-1.3h.6a1.8 1.8 0 011.4.4 3.6 3.6 0 01.3 2V41a33.1 33.1 0 00.2 5.3 5.5 5.5 0 001.1 2.1 5.3 5.3 0 01.9 1.3zM111 49.4v.3c0 .4-.4.8-1.4 1.2a9.6 9.6 0 01-3.5.6 2.7 2.7 0 01-2.1-1.1c-.3-.5-.6-.7-.8-.7a1.8 1.8 0 00-.9.5 8.3 8.3 0 01-4.8 1.5 6 6 0 01-4-1.3 4.7 4.7 0 01-1.6-3.7c0-3.4 2.6-5.5 7.8-6.4a12.9 12.9 0 002.3-.4 2 2 0 001-2 3.1 3.1 0 00-.7-2.4 2.3 2.3 0 00-1.7-.7 3.5 3.5 0 00-2.8 1.6 3.6 3.6 0 01-3 1.7 1.9 1.9 0 01-1.4-.6 1.6 1.6 0 01-.5-1 3 3 0 011.8-2.8A12.7 12.7 0 01101 32h1a7.5 7.5 0 013.2.7 5.2 5.2 0 012.4 2.2q.8 1.5.8 6.5c0 3.4.1 5.4.3 5.9a2 2 0 001.3 1.1q1 .4 1 1zm-7.9-6.2q0-1-.5-1h-.5a4.5 4.5 0 01-.8.2 4.4 4.4 0 00-3 1 3 3 0 00-1.2 2.3v.5a2.6 2.6 0 00.7 1.7 2 2 0 001.5.7h.6a3.2 3.2 0 002.2-.8 2.2 2.2 0 001-1.5 3.3 3.3 0 000-.6V43.4a2.5 2.5 0 010-.2zM121.3 53.9a4.3 4.3 0 00.9 2.7l.9.9a2 2 0 01.7 1.1c0 .5-.3.8-1 1a17.9 17.9 0 01-3.6.1h-.6a18.1 18.1 0 01-4-.2c-.6-.2-.8-.4-.8-.8a8.2 8.2 0 011-1.7 8 8 0 001.2-3.1v-8.4l-.1-8.7a2.7 2.7 0 00-1.3-1.6c-.7-.4-1-1-1-1.4s.3-.7.9-1a15.5 15.5 0 014.8-.8 1.2 1.2 0 011 .3 4 4 0 01.5.7c.2.3.3.4.5.4a2.9 2.9 0 001-.4 15.4 15.4 0 011.7-.8 6.8 6.8 0 012.5-.4h.6a6 6 0 012.8.8 7.6 7.6 0 012.4 2 9.7 9.7 0 012 6.2 10.6 10.6 0 01-2.6 7.6 8 8 0 01-3 2.1 10.5 10.5 0 01-3.8.6l-1.5-.1-.8-.1-.4-.1c-.6 0-.9 1-.9 3zm7.4-12.2v-1a7.3 7.3 0 00-1.4-4.5 3.3 3.3 0 00-2.8-1.4h-.1a3 3 0 00-2.7 1.3 5 5 0 00-.7 2.9V45.3a3.7 3.7 0 00.9 2.6 3 3 0 002.3 1h.4a3.7 3.7 0 003.2-2.1 9.1 9.1 0 00.9-4.6v-.3zM145.2 53.9a4.4 4.4 0 00.8 2.7l.9.9a2 2 0 01.7 1.1c0 .5-.3.8-.9 1a17.9 17.9 0 01-3.7.1h-.5a18.1 18.1 0 01-4.1-.2c-.5-.2-.8-.4-.8-.8a8.2 8.2 0 011-1.7 7.8 7.8 0 001.2-3.1 177.8 177.8 0 000-17 2.7 2.7 0 00-1.3-1.7c-.7-.4-1.1-1-1.1-1.4s.3-.7 1-1a15.4 15.4 0 014.8-.8 1.3 1.3 0 01.9.3 4 4 0 01.5.7c.2.3.4.4.6.4a2.9 2.9 0 001-.4 15.4 15.4 0 011.7-.8 6.7 6.7 0 012.5-.4h.6a6.1 6.1 0 012.8.7 7.6 7.6 0 012.4 2 9.7 9.7 0 012 6.3 10.7 10.7 0 01-2.7 7.5 8 8 0 01-3 2.2 10.5 10.5 0 01-3.7.6l-1.5-.2h-.9l-.3-.1c-.6 0-1 1-1 3zm7.3-12.2v-1a7.3 7.3 0 00-1.4-4.5 3.3 3.3 0 00-2.8-1.4h-.1a3 3 0 00-2.7 1.3 5 5 0 00-.6 2.9V45.3a3.7 3.7 0 00.8 2.6 3 3 0 002.4 1h.3a3.7 3.7 0 003.2-2.1 9.1 9.1 0 001-4.6v-.3z" />
          </svg>
        </Toolbar>
        <Divider />
        <div className={classes.menu}>{menuContent}</div>
      </Drawer>

      <div className={clsx(classes.content, !open && classes.expandedContent)}>
        {children}
      </div>
    </div>
  );
};
export default SidebarLayout;
