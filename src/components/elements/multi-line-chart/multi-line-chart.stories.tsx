import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { MultiLineChart } from './multi-line-chart';

export default { component: MultiLineChart } as ComponentMeta<typeof MultiLineChart>;

export const FullData: ComponentStoryObj<typeof MultiLineChart> = {
  args: {
    input: {
      '0s': { yama: 100, kawa: 200, umi: 300 },
      '20s': { yama: 120, kawa: 220, umi: 320 },
      '40s': { yama: 140, kawa: 240, umi: 340 },
      '60s': { yama: 160, kawa: 260, umi: 360 }
    }
  }
};

export const JapaneseLabel: ComponentStoryObj<typeof MultiLineChart> = {
  args: {
    input: {
      '2000': { 香川県: 100, 徳島県: 200, 愛媛県: 300, 高知県: 400 },
      '2005': { 香川県: 120, 徳島県: 220, 愛媛県: 320, 高知県: 420 },
      '2010': { 香川県: 140, 徳島県: 240, 愛媛県: 340, 高知県: 440 },
      '2015': { 香川県: 160, 徳島県: 260, 愛媛県: 360, 高知県: 460 }
    }
  }
};

export const MissingData: ComponentStoryObj<typeof MultiLineChart> = {
  args: {
    input: {
      '0s': { yama: 100, kawa: 200, umi: 300 },
      '20s': { kawa: 220, umi: 320 },
      '40s': { yama: 140, umi: 340 },
      '60s': { yama: 160, kawa: 260 }
    }
  }
};
