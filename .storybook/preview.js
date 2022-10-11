// Registers the msw addon
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { mockPopulationsApiHandler, mockPrefecturesApiHandler } from '../src/mocks/handlers';

// Initialize MSW
initialize(); // setup はする必要なし

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  msw: {
    handlers: {
      prefectures: mockPrefecturesApiHandler,
      populations: mockPopulationsApiHandler
    }
  }
};
