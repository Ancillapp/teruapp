import React, { Suspense, useState, FunctionComponent, lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { useTheme, useMediaQuery } from '@material-ui/core';

import SidebarLayout from '../components/common/SidebarLayout';
import SidebarMenu from '../components/common/SidebarMenu';
import Loader from '../components/common/Loader';
import PageSkeleton from '../components/common/PageSkeleton';
import { TopbarLayoutProps } from '../components/common/TopbarLayout';
import { useCommunities } from '../providers/CommunitiesProvider';

import Wizard from './core/Wizard';

const SongsRouter = lazy(() => import('./songs/SongsRouter'));

const Root: FunctionComponent = () => {
  const theme = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(
    window.matchMedia(`(min-width:${theme.breakpoints.width('sm')}px)`).matches,
  );

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  const commonRouteProps: TopbarLayoutProps = {
    onMenuButtonClick: () => setSidebarOpen(!sidebarOpen),
  };

  const { communities, selectedCommunity } = useCommunities();

  if (
    typeof communities === 'undefined' ||
    typeof selectedCommunity === 'undefined'
  ) {
    return <Loader />;
  }

  return selectedCommunity ? (
    <Suspense fallback={<Loader />}>
      <SidebarLayout
        menuContent={
          <SidebarMenu onItemClick={() => !isNarrow && setSidebarOpen(false)} />
        }
        open={sidebarOpen}
        onToggle={setSidebarOpen}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route exact path="/">
              <SongsRouter {...commonRouteProps} />
            </Route>

            <Redirect to="/" />
          </Switch>
        </Suspense>
      </SidebarLayout>
    </Suspense>
  ) : (
    <Wizard />
  );
};

export default Root;
