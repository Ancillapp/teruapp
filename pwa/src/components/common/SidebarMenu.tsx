import React, { ReactNode, FunctionComponent } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  LibraryMusic as LibraryMusicIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@material-ui/icons';

import { useMenu } from '../../providers/MenuProvider';
import { Community } from '../../models/community';

const useStyles = makeStyles((theme) => ({
  upperMenu: { flex: '1 1 auto' },
  lowerMenu: { flex: '0 0 auto' },
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

const UPPER_MENU_ITEMS: MenuItem[] = [
  {
    key: 'libri-canti',
    title: 'Libri dei canti',
    icon: <LibraryMusicIcon />,
  },
];

const LOWER_MENU_ITEMS: MenuItem[] = [
  {
    key: 'informazioni',
    title: 'Informazioni',
    icon: <InfoOutlinedIcon />,
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

  const getMenuItems = (items: MenuItem[]) =>
    items.map(({ key, title, icon, link }) => (
      <ListItem
        button
        key={key}
        component={NavLink}
        to={link || `/${community.id}/${key}`}
        className={classes.menuItem}
        activeClassName={classes.active}
        onClick={handleItemClick}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItem>
    ));

  return (
    <>
      <List component="nav" className={classes.upperMenu}>
        {getMenuItems(UPPER_MENU_ITEMS)}
      </List>
      <List component="nav" className={classes.lowerMenu}>
        <Divider />
        {getMenuItems(LOWER_MENU_ITEMS)}
      </List>
    </>
  );
};

export default SidebarMenu;
