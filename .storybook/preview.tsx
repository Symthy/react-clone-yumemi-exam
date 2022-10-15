// Registers the msw addon
import { initialize, mswDecorator } from 'msw-storybook-addon';
import React from 'react';
import { mockPopulationsApiHandler, mockPrefecturesApiHandler } from '../src/mocks/handlers';
import { GlobalStyles } from '../src/libs/global-style';

// Initialize MSW
initialize(); // setup はする必要なし

const commonDecorator = (StoryFn: Function) => {
  return (
    <>
      <StoryFn />
      <GlobalStyles />
    </>
  );
};

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator, commonDecorator];

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
