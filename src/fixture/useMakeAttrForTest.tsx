import { useEnabledE2EMode } from 'src/fixture/useEnabledE2EMode';

// building html attribute for selecting elements during e2e test with Cypress. Always run e2e tests in DEV mode.
// ref: https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
export const useMakeAttrForTest = () => {
  const isEnabledE2E = useEnabledE2EMode();

  return (label: string) => {
    if (isEnabledE2E) {
      return { 'data-test': label };
    }
    return {};
  };
};
