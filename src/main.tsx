import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

if (import.meta.env.VITE_STARTUP_MSW === 'true') {
  const { buildMswWorker } = await import('./mocks/browser');
  const worker = buildMswWorker();
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
