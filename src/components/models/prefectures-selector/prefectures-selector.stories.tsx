import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { PrefecturesSelector } from './prefectures-selector';
import { Prefecture } from './types';

export default { component: PrefecturesSelector } as ComponentMeta<typeof PrefecturesSelector>;

const testPerfs: Prefecture[] = [
  {
    prefCode: 36,
    prefName: '徳島県',
    isSelected: false
  },
  {
    prefCode: 37,
    prefName: '香川県',
    isSelected: false
  },
  {
    prefCode: 38,
    prefName: '愛媛県',
    isSelected: false
  },
  {
    prefCode: 39,
    prefName: '高知県',
    isSelected: false
  },
  {
    prefCode: 40,
    prefName: '福岡県',
    isSelected: false
  },
  {
    prefCode: 41,
    prefName: '佐賀県',
    isSelected: false
  },
  {
    prefCode: 42,
    prefName: '長崎県',
    isSelected: false
  },
  {
    prefCode: 43,
    prefName: '熊本県',
    isSelected: false
  },
  {
    prefCode: 44,
    prefName: '大分県',
    isSelected: false
  },
  {
    prefCode: 45,
    prefName: '宮崎県',
    isSelected: false
  },
  {
    prefCode: 46,
    prefName: '鹿児島県',
    isSelected: false
  },
  {
    prefCode: 47,
    prefName: '沖縄県',
    isSelected: false
  }
];

const mockUpdateSelectedState = (id: string, isSelected: boolean) => {
  const index = testPerfs.findIndex((pref) => String(pref.prefCode) === id);
  if (index === -1) {
    return;
  }
  testPerfs[index].isSelected = isSelected;
};

export const Index: ComponentStoryObj<typeof PrefecturesSelector> = {
  args: {
    prefectures: testPerfs,
    updateSelectedState: mockUpdateSelectedState
  }
};