import React, { Suspense, FunctionComponent, lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarLayout from '../components/common/SidebarLayout';
import SidebarMenu from '../components/common/SidebarMenu';
import Loader from '../components/common/Loader';
import PageSkeleton from '../components/common/PageSkeleton';
import { useCommunities } from '../providers/CommunitiesProvider';

const Setup = lazy(() => import('./core/Setup'));
const SongBooksRouter = lazy(() => import('./songBooks/SongBooksRouter'));
const Info = lazy(() => import('./core/Info'));

const Root: FunctionComponent = () => {
  const { selectedCommunity } = useCommunities();

  if (typeof selectedCommunity === 'undefined') {
    return <Loader />;
  }

  return (
    <Switch>
      <Route
        path="/:url*(/+)"
        exact
        strict
        render={(props) => (
          <Redirect to={`${props.location.pathname.slice(0, -1)}`} />
        )}
      />

      <Suspense fallback={<Loader />}>
        {selectedCommunity ? (
          <SidebarLayout
            menuContent={<SidebarMenu community={selectedCommunity} />}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Switch>
                <Route path={`/${selectedCommunity.id}/libri-canti`}>
                  <SongBooksRouter />
                </Route>

                <Route path="/informazioni">
                  <Info />
                </Route>

                <Redirect to={`/${selectedCommunity.id}/libri-canti`} />
              </Switch>
            </Suspense>
          </SidebarLayout>
        ) : (
          <Switch>
            <Route exact path="/configurazione">
              <Setup />
            </Route>

            <Redirect to="/configurazione" />
          </Switch>
        )}
      </Suspense>
    </Switch>
  );
};

export default Root;
