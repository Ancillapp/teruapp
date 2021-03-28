import React, { lazy, Suspense, useState, FunctionComponent } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Snackbar, Button, useTheme, useMediaQuery } from '@material-ui/core';

import SidebarLayout from '../components/common/SidebarLayout';
import SidebarMenu from '../components/common/SidebarMenu';
import Loader from '../components/common/Loader';
import PageSkeleton from '../components/common/PageSkeleton';
import TopbarLayout, {
  TopbarLayoutProps,
} from '../components/common/TopbarLayout';

// const SongsRouter = lazy(() => import('./songs/SongsRouter'));

const Root: FunctionComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const theme = useTheme();

  const isNarrow = useMediaQuery(theme.breakpoints.up('sm'));

  const commonRouteProps: Partial<TopbarLayoutProps> = {
    onMenuButtonClick: () => setSidebarOpen(!sidebarOpen),
  };

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route>
          <SidebarLayout
            menuContent={
              <SidebarMenu
                onItemClick={() => !isNarrow && setSidebarOpen(false)}
              />
            }
            open={sidebarOpen}
            onToggle={setSidebarOpen}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Switch>
                <Route exact path="/">
                  <TopbarLayout title="Canti" {...commonRouteProps} />
                </Route>

                <Redirect to="/" />
              </Switch>
            </Suspense>
          </SidebarLayout>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Root;
