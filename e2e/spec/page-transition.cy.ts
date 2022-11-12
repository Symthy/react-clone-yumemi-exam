import { SetupWorkerApi, rest, ResponseResolver, MockedRequest, restContext } from 'msw';

const APP_URL = 'http://127.0.0.1:5173';
type MswHolder = {
  msw: { worker: SetupWorkerApi; rest: typeof rest };
};
const serverError: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => res(ctx.status(500));
const forbidden: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(ctx.status(200), ctx.json({ statusCode: '403', message: 'Forbidden.', description: '' }));
const RESAS_API_PREFECTURES_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const RESAS_API_POPULATIONS_URL = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';

describe('e2e: page transition', () => {
  beforeEach(() => {
    cy.visit(APP_URL);
    // Wait for MSW server to start
    cy.window().should('have.property', 'appReady', true);
  });

  it('login', () => {
    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=login-page-title]').should('exist');
    cy.get('[data-test=login-apikey-field]').type('test-key');
    cy.get('[data-test=login-btn]').click();
    cy.url().should('eq', `${APP_URL}/prefecture-population-view`);
    cy.get('[data-test=pref-list-title]').should('exist');
    cy.get('[data-test=pop-graph-title]').should('exist');
    cy.get('[data-test=toast]').should('not.exist');
  });

  it('redirect to login page when no login', () => {
    cy.visit(`${APP_URL}/prefecture-population-view`);
    cy.get('[data-test=login-page-title]').should('exist');
    cy.get('[data-test=toast]').should('not.exist');
  });

  it('invalid api key when login', () => {
    cy.window().then((window) => {
      const { worker, rest } = (window as Cypress.AUTWindow & MswHolder).msw;
      worker.use(
        rest.get(RESAS_API_PREFECTURES_URL, (req, res, ctx) => {
          return res.once(ctx.status(400), ctx.json({ statusCode: '403', message: 'Forbidden.', description: '' }));
        })
      );
    });

    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=login-page-title]').should('exist');
    cy.get('[data-test=toast]').should('not.exist');
    cy.get('[data-test=login-apikey-field]').type('test-key');
    cy.get('[data-test=login-btn]').click();
    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=toast]').should('exist');
    cy.get('[data-test=toast-close-btn]').click();
    cy.get('[data-test=toast]').should('not.exist');
  });

  it('server error when login', () => {
    cy.window().then((window) => {
      const { worker, rest } = (window as Cypress.AUTWindow & MswHolder).msw;
      worker.use(
        rest.get(RESAS_API_PREFECTURES_URL, (req, res, ctx) => {
          return res.once(ctx.status(500), ctx.json({ message: 'Internal server error' }));
        })
      );
    });

    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=login-page-title]').should('exist');
    cy.get('[data-test=login-apikey-field]').type('test-key');
    cy.get('[data-test=login-btn]').click();
    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=error-page-title]').should('exist');
    cy.get('[data-test=top-return-btn]').click();
    cy.get('[data-test=login-page-title]').should('exist');
    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=toast]').should('not.exist');
  });

  it('server error when after login', () => {
    cy.window().then((window) => {
      const { worker, rest } = (window as Cypress.AUTWindow & MswHolder).msw;
      worker.use(
        rest.get(RESAS_API_POPULATIONS_URL, (req, res, ctx) => {
          return res.once(ctx.status(500), ctx.json({ message: 'Internal server error' }));
        })
      );
    });

    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=login-page-title]').should('exist');
    cy.get('[data-test=login-apikey-field]').type('test-key');
    cy.get('[data-test=login-btn]').click();
    cy.url().should('eq', `${APP_URL}/prefecture-population-view`);
    cy.get('[id=checkbox-36]').click();
    cy.get('[data-test=error-page-title]').should('exist');
    cy.get('[data-test=top-return-btn]').click();
    cy.get('[data-test=login-page-title]').should('exist');
    cy.url().should('eq', `${APP_URL}/login`);
    cy.get('[data-test=toast]').should('not.exist');
  });
});
