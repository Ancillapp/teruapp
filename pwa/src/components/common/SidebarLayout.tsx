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
} from '@material-ui/core';

import CommunitySelector from '../../containers/communities/CommunitySelector';

import Logo from './Logo';

export interface SidebarLayoutProps extends DrawerProps {
  menuContent?: ReactNode;
  onToggle?(open: boolean): void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100%',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(1.5, 2.5),
  },
  logo: {
    height: '1.9rem',
    marginBottom: theme.spacing(4),
  },
  menu: {
    width: 'min(100vw - 56px, 280px)',

    [theme.breakpoints.up('sm')]: {
      width: 'min(100vw - 64px, 320px)',
    },
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
      width: '100vw',
    },
  },
}));

const SidebarLayout: FunctionComponent<SidebarLayoutProps> = ({
  menuContent,
  open,
  children,
  onToggle,
  ...props
}) => {
  const theme = useTheme();

  const classes = useStyles();

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        variant={isNarrow ? 'persistent' : 'temporary'}
        open={open}
        onClose={() => onToggle?.(false)}
        {...props}
      >
        <Toolbar className={classes.toolbar}>
          <Logo className={classes.logo} />
          <CommunitySelector />
        </Toolbar>
        <Divider />
        <div className={classes.menu}>{menuContent}</div>
      </Drawer>

      <div
        className={clsx(
          classes.content,
          isNarrow && !open && classes.expandedContent,
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default SidebarLayout;
