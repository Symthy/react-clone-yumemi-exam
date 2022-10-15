import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ErrorFallback } from './error-fallback';

export default { component: ErrorFallback } as ComponentMeta<typeof ErrorFallback>;

export const Default: ComponentStoryObj<typeof ErrorFallback> = {
  args: {
    error: new Error('test error')
  }
};
