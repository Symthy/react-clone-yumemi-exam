import { ChangeEvent, useState } from 'react';

export const useRadioState = (initItem: string) => {
  const [selectedItem, setSelectedItem] = useState(initItem);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(e.target.value);
  };
  const checked = (item: string) => item === selectedItem;

  return { selectedItem, checked, onChange };
};
