import React, { lazy, FunctionComponent } from 'react';

import { Helmet } from 'react-helmet';

import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

const SongsList = lazy(() => import('./SongsList'));

const SongsRouter: FunctionComponent = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <Helmet
        defaultTitle="Teruapp - Canti"
        titleTemplate="Teruapp - Canti - %s"
      />

      <Switch>
        <Route exact path={path}>
          <SongsList />
        </Route>

        <Redirect to={url} />
      </Switch>
    </>
  );
};

export default SongsRouter;
