import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from 'ui/theme';

import App from 'components/App';
import IntlWrapper from 'components/IntlWrapper';
import OneTapLogin from 'components/OneTapLogin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <OneTapLogin />

    <HashRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <IntlWrapper>
            <App />
          </IntlWrapper>
        </QueryClientProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
);
