import React, { FunctionComponent } from 'react';

import { Helmet } from 'react-helmet';

import { BrowserRouter } from 'react-router-dom';

import {
  StyledEngineProvider,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';

import lightTheme from '../themes/light';
import darkTheme from '../themes/dark';

import Root from './Root';
import { useThemeName } from '../providers/ThemeNameProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import itLocale from 'date-fns/locale/it';

import APIProvider from '../providers/APIProvider';
import CommunitiesProvider from '../providers/CommunitiesProvider';
import MenuProvider from '../providers/MenuProvider';
import ServiceWorkerProvider from '../providers/ServiceWorkerProvider';

const App: FunctionComponent = () => {
  const themeName = useThemeName();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
          <Helmet defaultTitle="Teruapp" titleTemplate="Teruapp - %s" />
          <CssBaseline />
          <APIProvider baseUrl={import.meta.env.VITE_API_URL}>
            <CommunitiesProvider>
              <MenuProvider>
                <ServiceWorkerProvider>
                  <BrowserRouter>
                    <Root />
                  </BrowserRouter>
                </ServiceWorkerProvider>
              </MenuProvider>
            </CommunitiesProvider>
          </APIProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
