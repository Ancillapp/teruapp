import React, { FunctionComponent, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import { QueryClientProvider, QueryClient } from 'react-query';

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

const themeColor = document.querySelector<HTMLMetaElement>(
  'meta[name="theme-color"]',
);

const queryClient = new QueryClient();

const App: FunctionComponent = () => {
  const themeName = useThemeName();

  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    if (themeColor) {
      themeColor.content = theme.palette.primary.main;
    }
  }, [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
          <Helmet defaultTitle="Teruapp" titleTemplate="Teruapp - %s" />
          <CssBaseline />
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <APIProvider baseUrl={import.meta.env.VITE_API_URL}>
                <CommunitiesProvider>
                  <Root />
                </CommunitiesProvider>
              </APIProvider>
            </QueryClientProvider>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
