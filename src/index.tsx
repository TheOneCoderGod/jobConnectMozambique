import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { store } from './store';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ThemeContextProvider from './contexts/ThemeContext';
import { OptimizationProvider } from './utils/OptimizationContext';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <OptimizationProvider>
        <BrowserRouter>
          <ThemeContextProvider>
            <CssBaseline />
            <App />
          </ThemeContextProvider>
        </BrowserRouter>
      </OptimizationProvider>
    </Provider>
  </React.StrictMode>
);

// Register service worker for offline capabilities
serviceWorkerRegistration.register();
