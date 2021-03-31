import React, { lazy, FunctionComponent } from 'react';

import { Helmet } from 'react-helmet';

import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

import { TopbarLayoutProps } from '../../components/common/TopbarLayout';

const SongsList = lazy(() => import('./SongsList'));

const SongsRouter: FunctionComponent<TopbarLayoutProps> = (props) => {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet
        defaultTitle="Teruapp - Canti"
        titleTemplate="Teruapp - Canti - %s"
      />

      <Switch>
        <Route exact path={path}>
          <SongsList {...props} />
        </Route>

        <Redirect to={path} />
      </Switch>
    </>
  );
};

export default SongsRouter;
