// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker, rest as baseRest, SetupWorkerApi } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
export const rest = baseRest;

type MswHolder = {
  msw: {
    worker: SetupWorkerApi;
    rest: typeof rest;
  };
};

(window as Window & typeof globalThis & MswHolder).msw = { worker, rest };
