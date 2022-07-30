import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { MultiLineChart } from './MultiLineChart';

import { MultiLineChartInput } from './types';

export default { component: MultiLineChart } as ComponentMeta<typeof MultiLineChart>;

const testFullData: MultiLineChartInput = {
  '0s': { yama: 100, kawa: 200, umi: 300 },
  '20s': { yama: 120, kawa: 220, umi: 320 },
  '40s': { yama: 140, kawa: 240, umi: 340 },
  '60s': { yama: 160, kawa: 260, umi: 360 }
};

export const FullData: ComponentStoryObj<typeof MultiLineChart> = {
  args: {
    input: testFullData
  }
};

const testMissngData: MultiLineChartInput = {
  '0s': { yama: 100, kawa: 200, umi: 300 },
  '20s': { kawa: 220, umi: 320 },
  '40s': { yama: 140, umi: 340 },
  '60s': { yama: 160, kawa: 260 }
};

export const MissingData: ComponentStoryObj<typeof MultiLineChart> = {
  args: {
    input: testMissngData
  }
};
