import { css } from '@emotion/react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BsExclamationDiamond } from 'react-icons/bs';
import { ApiClientError } from 'src/api/error';
import { makeAttrForTest } from 'src/fixture/attributeBuilder';

const styles = {
  head: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  btn: css`
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3);
    :hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
  `
};

type ApiClientErrorToastProps = {
  err: ApiClientError;
  onCloseToast: () => void;
};

export const ApiClientErrorToast = ({ err, onCloseToast }: ApiClientErrorToastProps) => (
  <div {...makeAttrForTest('toast')}>
    <div css={styles.head}>
      <BsExclamationDiamond color='#e41010' size={16} />
      <div>{`RESAS API Error:  ${err.statusCode} ${err.message}`}</div>
      <AiFillCloseSquare size={24} css={styles.btn} onClick={onCloseToast} {...makeAttrForTest('toast-close-btn')} />
    </div>
    <p>{err.displayMessage}</p>
  </div>
);
