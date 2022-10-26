import { useState } from 'react';
import { css } from '@emotion/react';

type CheckBoxProps = {
  id: string;
  label: string;
  onToggleSelectedState: (id: string, isChecked: boolean) => void;
};

const styles = {
  checkbox: css`
    vertical-align: middle;
    margin-right: 0.3rem;
    margin-bottom: 0.1rem;
  `
};

export const CheckBox = ({ id, label, onToggleSelectedState }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = () => {
    setIsChecked(!isChecked);
    onToggleSelectedState(id, !isChecked);
  };

  return (
    <label>
      <input css={styles.checkbox} type='checkbox' id={`checkbox-${id}`} checked={isChecked} onChange={onChange} />
      {label}
    </label>
  );
};
