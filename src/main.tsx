import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// eslint-disable-next-line consistent-return
async function prepare() {
  if (process.env.VITE_STARTUP_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.Cypress) window.appReady = true; // wait startup for e2e test by Cypress. ref: https://github.com/mswjs/msw/issues/1052
    return worker.start({}).then(() => {
      worker.printHandlers();
      return null;
    });
  }
}

void prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
