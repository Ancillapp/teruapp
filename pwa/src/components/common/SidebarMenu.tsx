import React, { ReactNode, FunctionComponent, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Skeleton,
  useMediaQuery,
  useTheme,
  alpha,
} from '@material-ui/core';
import {
  LibraryMusicRounded as LibraryMusicIcon,
  MusicNoteRounded as MusicNoteIcon,
  InfoOutlined as InfoIcon,
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
  nested: {
    background: alpha(
      theme.palette.background.default,
      theme.palette.mode === 'dark' ? 0.23 : 1,
    ),
    paddingLeft: theme.spacing(4),
  },
}));

interface MenuItem {
  key: string;
  title: ReactNode;
  icon: ReactNode;
  link?: string;
  subitems?: Pick<MenuItem, 'key' | 'title' | 'link'>[];
}

const UPPER_MENU_ITEMS: MenuItem[] = [];

const LOWER_MENU_ITEMS: MenuItem[] = [
  {
    key: 'informazioni',
    title: 'Informazioni',
    icon: <InfoIcon />,
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

  if (!songBooks || songBooks.length < 1) {
    return {
      ...baseMenuItem,
      title: <Skeleton variant="text" width={160} />,
      icon: <Skeleton variant="circular" width={24} height={24} />,
    };
  }

  return {
    ...baseMenuItem,
    ...(songBooks.length > 1
      ? {
          icon: <LibraryMusicIcon />,
          title: 'Libri dei canti',
          link: `/${communityId}/libri-canti`,
          subitems: songBooks.map(({ id, title }) => ({
            key: `${communityId}-${id}`,
            title,
            link: `/${communityId}/libri-canti/${id}/canti`,
          })),
        }
      : {
          icon: <MusicNoteIcon />,
          title: 'Canti',
          link: `/${communityId}/libri-canti/${songBooks[0].id}/canti`,
        }),
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
    items.map(({ key, title, icon, link, subitems = [] }) => (
      <Fragment key={key}>
        <ListItem
          button
          component={NavLink}
          to={link || `/${key}`}
          className={classes.menuItem}
          activeClassName={classes.active}
          onClick={handleItemClick}
          exact={subitems.length > 0}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItem>
        {subitems.length > 0 && (
          <Collapse in>
            <List component="div" disablePadding>
              {subitems.map(
                ({ key: subkey, title: subtitle, link: sublink }) => (
                  <ListItem
                    button
                    className={classes.nested}
                    key={`${key}-${subkey}`}
                    component={NavLink}
                    to={sublink || `/${key}/${subkey}`}
                    activeClassName={classes.active}
                    onClick={handleItemClick}
                  >
                    <ListItemText>{subtitle}</ListItemText>
                  </ListItem>
                ),
              )}
            </List>
          </Collapse>
        )}
      </Fragment>
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
