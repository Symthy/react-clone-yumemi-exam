import { useState } from 'react';

type CheckBoxProps = {
  id: string;
  label: string;
  onToggleSelectedState: (id: string, isChecked: boolean) => void;
};

export const CheckBox = ({ id, label, onToggleSelectedState }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = () => {
    setIsChecked(!isChecked);
    onToggleSelectedState(id, !isChecked);
  };
  const checkboxID = `checkbox-${id}`;

  return (
    <div>
      <input type='checkbox' id={checkboxID} checked={isChecked} onChange={onChange} />
      <label htmlFor={checkboxID}>{label}</label>
    </div>
  );
};
