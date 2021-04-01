import React, { lazy, FunctionComponent } from 'react';

import { Helmet } from 'react-helmet';

import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

const SongBooksList = lazy(() => import('./SongBooksList'));
const SongsRouter = lazy(() => import('../songs/SongsRouter'));

const SongBooksRouter: FunctionComponent = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet
        defaultTitle="Teruapp - Libri dei canti"
        titleTemplate="Teruapp - Libri dei canti - %s"
      />

      <Switch>
        <Route exact path={path}>
          <SongBooksList />
        </Route>

        <Route path={`${path}/:songBookId/canti`}>
          <SongsRouter />
        </Route>

        <Redirect to={path} />
      </Switch>
    </>
  );
};

export default SongBooksRouter;
