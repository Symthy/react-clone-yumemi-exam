import { Toaster } from 'react-hot-toast';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPopulationsForbiddenHandler } from 'src/mocks/handlers';
import { Prefecture } from 'src/types';
import { PrefecturePopulationGraph } from './prefecture-population-graph';

const testPerfs: Prefecture[] = [
  {
    prefCode: 36,
    prefName: '徳島県',
    isSelected: true
  },
  {
    prefCode: 37,
    prefName: '香川県',
    isSelected: true
  },
  {
    prefCode: 38,
    prefName: '愛媛県',
    isSelected: true
  },
  {
    prefCode: 39,
    prefName: '高知県',
    isSelected: true
  }
];

export default { component: PrefecturePopulationGraph } as ComponentMeta<typeof PrefecturePopulationGraph>;

export const Default: ComponentStoryObj<typeof PrefecturePopulationGraph> = {
  args: {
    prefectures: testPerfs
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    }
  ]
};

export const ClientError: ComponentStoryObj<typeof PrefecturePopulationGraph> = {
  args: {
    prefectures: []
  },
  parameters: {
    msw: {
      handlers: { population: mockPopulationsForbiddenHandler } // overwrite
    }
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
          <Toaster />
        </QueryClientProvider>
      );
    }
  ]
};
