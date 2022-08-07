import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { SelectionArea } from './selection-area';
import { SelectableItem } from './types';

export default { component: SelectionArea } as ComponentMeta<typeof SelectionArea>;

const items: Array<SelectableItem> = [
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' },
  { id: '5', label: 'five' },
  { id: '6', label: 'six' },
  { id: '7', label: 'seven' },
  { id: '8', label: 'eight' },
  { id: '9', label: 'nine' },
  { id: '10', label: 'ten' }
];

export const MultiItems: ComponentStoryObj<typeof SelectionArea> = {
  args: {
    title: 'Selectable Items',
    selectableItems: items
  }
};

export const NoItem: ComponentStoryObj<typeof SelectionArea> = {
  args: {
    title: 'Selectable Items',
    selectableItems: items
  }
};
