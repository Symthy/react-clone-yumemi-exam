// building html attribute for selecting elements during e2e test with Cypress. Always run e2e tests in DEV mode.
// ref: https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
export const makeAttrForTest = (label: string) => {
  if (process.env.VITE_E2E_MODE) {
    return { 'data-test': label };
  }
  return {};
};
