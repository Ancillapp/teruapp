import React, {
  Suspense,
  FunctionComponent,
  lazy,
  useState,
  useEffect,
} from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Button, Snackbar } from '@material-ui/core';

import SidebarLayout from '../components/common/SidebarLayout';
import SidebarMenu from '../components/common/SidebarMenu';
import Loader from '../components/common/Loader';
import PageSkeleton from '../components/common/PageSkeleton';
import { useCommunities } from '../providers/CommunitiesProvider';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';

const Setup = lazy(() => import('./core/Setup'));
const SongBooksRouter = lazy(() => import('./songBooks/SongBooksRouter'));
const Info = lazy(() => import('./core/Info'));

const Root: FunctionComponent = () => {
  const { updateReady, update } = useServiceWorker();

  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(
    updateReady,
  );

  const { selectedCommunity } = useCommunities();

  const handleUpdate = () => {
    setIsUpdating(true);
    update();
  };

  useEffect(() => {
    setShowUpdateNotification(updateReady);
  }, [updateReady]);

  if (typeof selectedCommunity === 'undefined') {
    return <Loader />;
  }

  return (
    <>
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

                  <Route path="/impostazioni">
                    <>Impostazioni</>
                  </Route>

                  <Route path="/informazioni">
                    <Info />
                  </Route>

                  <Route path="/privacy">
                    <>Privacy</>
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

      <Snackbar
        open={showUpdateNotification}
        message="Aggiornamento disponibile!"
        action={
          <>
            <Button
              color="inherit"
              size="small"
              disabled={isUpdating}
              onClick={() => setShowUpdateNotification(false)}
            >
              Ignora
            </Button>
            <Button
              color="primary"
              size="small"
              disabled={isUpdating}
              onClick={handleUpdate}
            >
              {isUpdating && <Loader size={18} />}
              Aggiorna ora
            </Button>
          </>
        }
      />
    </>
  );
};

export default Root;
