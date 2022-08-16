import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <BrowserRouter>
      <ThemeProvider theme={createTheme()}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
