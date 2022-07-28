import { useState } from 'react';

type CheckBoxProps = {
  id: string;
  label: string;
  onChangeSelectState: (id: string, isChecked: boolean) => void;
};

export const CheckBox = ({ id, label, onChangeSelectState: onToggleSelectedState }: CheckBoxProps) => {
  const [isChecked, setIsCheckedd] = useState(false);
  const onChange = () => {
    setIsCheckedd(!isChecked);
    onToggleSelectedState(id, !isChecked);
  };
  const checkboxID = `checkbox-${id}`;

  return (
    <>
      <div>
        <input type='checkbox' id={checkboxID} checked={isChecked} onChange={onChange} />
        <label htmlFor={checkboxID}>{label}</label>
      </div>
    </>
  );
};
