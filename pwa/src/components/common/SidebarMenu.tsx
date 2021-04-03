import React, { ReactNode, FunctionComponent } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  LibraryMusic as LibraryMusicIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@material-ui/icons';

import { useMenu } from '../../providers/MenuProvider';
import { Community } from '../../models/community';
import { useCommunities } from '../../providers/CommunitiesProvider';
import { SongBookSummary } from '../../models/songBook';

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
  title: ReactNode;
  icon: ReactNode;
  link?: string;
}

const UPPER_MENU_ITEMS: MenuItem[] = [];

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

const getSongBooksMenuItem = (
  communityId: string,
  songBooks?: SongBookSummary[],
) => {
  const baseMenuItem = { key: 'libri-canti' };

  if (typeof songBooks === 'undefined') {
    return {
      ...baseMenuItem,
      title: <Skeleton variant="text" width={160} />,
      icon: <Skeleton variant="circular" width={24} height={24} />,
    };
  }

  return {
    ...baseMenuItem,
    icon: <LibraryMusicIcon />,
    title: songBooks.length > 1 ? 'Libri dei canti' : 'Canti',
    link: `/${communityId}/libri-canti${
      songBooks.length > 1 ? '' : `/${songBooks[0].id}/canti`
    }`,
  };
};

const SidebarMenu: FunctionComponent<SidebarMenuProps> = ({
  community,
  onItemClick,
}) => {
  const classes = useStyles();

  const theme = useTheme();

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  const { toggle } = useMenu();

  const { selectedCommunitySongBooks } = useCommunities();

  const handleItemClick = () => {
    if (!isNarrow) {
      toggle(false);
    }

    onItemClick?.();
  };

  const upperMenuItems = [
    getSongBooksMenuItem(community.id, selectedCommunitySongBooks),
    ...UPPER_MENU_ITEMS,
  ];

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
        {getMenuItems(upperMenuItems)}
      </List>
      <List component="nav" className={classes.lowerMenu}>
        <Divider />
        {getMenuItems(LOWER_MENU_ITEMS)}
      </List>
    </>
  );
};

export default SidebarMenu;
