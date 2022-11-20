import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// ref: https://github.com/vitejs/vite/issues/9369
// ref: https://github.com/vitejs/vite/issues/8663 // {} で括らないと置換が正しく行われずビルド失敗する
// eslint-disable-next-line arrow-body-style
const isEnabledE2E = (): boolean => {
  return import.meta.env.VITE_E2E_MODE !== undefined && import.meta.env.VITE_E2E_MODE === 'true';
};

async function prepare() {
  if (import.meta.env.VITE_STARTUP_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.Cypress) window.appReady = true; // wait startup for e2e test by Cypress. ref: https://github.com/mswjs/msw/issues/1052
    return worker
      .start({})
      .then(() => {
        worker.printHandlers();
        return null;
      })
      .then(() => isEnabledE2E());
  }
  return isEnabledE2E();
}

void prepare().then((enabledE2E) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App isEnabledE2E={enabledE2E} />
    </React.StrictMode>
  );
});
