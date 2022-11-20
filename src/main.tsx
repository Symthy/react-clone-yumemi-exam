import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

async function prepare() {
  if (import.meta.env.VITE_STARTUP_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.Cypress) window.appReady = true; // wait startup for e2e test by Cypress. ref: https://github.com/mswjs/msw/issues/1052
    return worker.start({}).then(() => {
      worker.printHandlers();
      return null;
    });
  }
  return new Promise(() => {});
}

function resolveEnabledE2E() {
  return import.meta.env.VITE_E2E_MODE === 'true';
}

void prepare()
  .then(resolveEnabledE2E)
  .then((isEnabledE2E) => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App isEnabledE2E={isEnabledE2E} />
      </React.StrictMode>
    );
  });
