import { ChangeEvent, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { BiLogIn } from 'react-icons/bi';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { Button } from 'src/components/elements/button';
import { ExternalTextLink } from 'src/components/elements/external-text-link';
import { InputTextField } from 'src/components/elements/input-text-field';
import { footerHeight, headerHeight } from 'src/styles';
import { useSubmitApiKey } from './useSubmitApiKey';

const RESAS_REGISTER_PAGE_URL = 'https://opendata.resas-portal.go.jp/form.html';

const styles = {
  foundation: css`
    height: calc(100vh - ${headerHeight} - ${footerHeight});
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  container: css`
    width: 30rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border: 1px solid;
    box-shadow: 1px 1px 2px 0 #ccc;
    padding-bottom: 2rem;
    > * {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `,
  form: css`
    & > :not(:last-child) {
      margin-bottom: 1rem;
    }
  `
};

export const LoginPage = () => {
  const [apiKey, setApiKey] = useState('');
  const onInputApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const onSumbitApiKey = useSubmitApiKey(apiKey);

  const { apiClient } = useResasApiClient();
  useEffect(() => {
    if (apiClient.initialized()) {
      setApiKey(apiClient.resasApiKey);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div css={styles.foundation}>
      <div css={styles.container}>
        <h2>利用開始</h2>
        <form css={styles.form} onSubmit={onSumbitApiKey}>
          <label htmlFor='apikey'>RESAS API キーを入力してください</label>
          <ExternalTextLink
            beforeLabel='RESAS API キー の取得は'
            linkLabel='こちら'
            afterLabel='から'
            url={RESAS_REGISTER_PAGE_URL}
            fontSize={14}
          />
          <InputTextField placeholder='API キー' value={apiKey} onChange={onInputApiKey} />
          <Button label='利用開始' type='submit' suffix={<BiLogIn size={`${22 / 16}rem`} color='white' />} />
        </form>
      </div>
    </div>
  );
};
