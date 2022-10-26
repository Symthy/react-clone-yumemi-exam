import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { RadioButtons } from './radio-buttons';
import { useRadioState } from './useRadioState';

const RadioButtonsForStory = ({ name, items }: { name: string; items: string[] }) => {
  const { checked, onChange } = useRadioState('item1');
  return <RadioButtons name={name} items={items} checked={checked} onChange={onChange} />;
};

export default { component: RadioButtonsForStory } as ComponentMeta<typeof RadioButtonsForStory>;

export const Default: ComponentStoryObj<typeof RadioButtonsForStory> = {
  args: {
    name: 'default',
    items: ['item1', 'item2', 'item3']
  }
};

export const TwoByteCharacter: ComponentStoryObj<typeof RadioButtonsForStory> = {
  args: {
    name: 'two-byte-character',
    items: ['アイテム１', 'アイテム２', 'アイテム３']
  }
};

export const ManyItems: ComponentStoryObj<typeof RadioButtonsForStory> = {
  args: {
    name: 'many-items',
    items: [
      'item1',
      'item2',
      'item3',
      'item4',
      'item5',
      'item6',
      'item7',
      'item8',
      'item9',
      'item10',
      'item11',
      'item12',
      'item13',
      'item14',
      'item15',
      'item16',
      'item17',
      'item18',
      'item19',
      'item20'
    ]
  }
};
