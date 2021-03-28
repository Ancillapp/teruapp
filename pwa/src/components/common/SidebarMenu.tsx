import React, { ReactNode, FunctionComponent, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import { LibraryMusic as LibraryMusicIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    paddingLeft: theme.spacing(2.5),
  },
  active: {
    '& *': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

interface MenuItem {
  key: string;
  title: string;
  icon: ReactNode;
  link?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    key: 'canti',
    title: 'Canti',
    link: '/',
    icon: <LibraryMusicIcon />,
  },
];

interface SidebarMenuProps {
  onItemClick?(): void;
}

const SidebarMenu: FunctionComponent<SidebarMenuProps> = ({ onItemClick }) => {
  const classes = useStyles();

  return (
    <List component="nav">
      {MENU_ITEMS.map(({ key, title, icon, link }) => (
        <Fragment key={key}>
          <ListItem
            button
            component={NavLink}
            exact={key === 'canti'}
            to={link || `/${key}`}
            className={classes.menuItem}
            activeClassName={classes.active}
            onClick={onItemClick}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{title}</ListItemText>
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
};

export default SidebarMenu;
