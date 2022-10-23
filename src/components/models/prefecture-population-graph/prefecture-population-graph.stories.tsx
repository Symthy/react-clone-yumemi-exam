import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Prefecture } from 'src/types';
import { PrefecturePopulationGraphMemo } from './prefecture-population-graph';

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

export default { component: PrefecturePopulationGraphMemo } as ComponentMeta<typeof PrefecturePopulationGraphMemo>;

export const Default: ComponentStoryObj<typeof PrefecturePopulationGraphMemo> = {
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
