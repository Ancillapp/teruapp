import React, { ReactNode, FunctionComponent, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { LibraryMusic as LibraryMusicIcon } from '@material-ui/icons';

import { useMenu } from '../../providers/MenuProvider';
import { Community } from '../../models/community';

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
    key: 'libri-canti',
    title: 'Libri dei canti',
    icon: <LibraryMusicIcon />,
  },
];

interface SidebarMenuProps {
  community: Community;
  onItemClick?(): void;
}

const SidebarMenu: FunctionComponent<SidebarMenuProps> = ({
  community,
  onItemClick,
}) => {
  const classes = useStyles();

  const theme = useTheme();

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  const { toggle } = useMenu();

  const handleItemClick = () => {
    if (!isNarrow) {
      toggle(false);
    }

    onItemClick?.();
  };

  return (
    <List component="nav">
      {MENU_ITEMS.map(({ key, title, icon, link }) => (
        <Fragment key={key}>
          <ListItem
            button
            component={NavLink}
            to={link || `/${community.id}/${key}`}
            className={classes.menuItem}
            activeClassName={classes.active}
            onClick={handleItemClick}
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
