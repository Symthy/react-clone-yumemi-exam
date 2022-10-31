import { ChangeEvent, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { BiLogIn } from 'react-icons/bi';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { Button } from 'src/components/elements/button';
import { ExternalTextLink } from 'src/components/elements/external-text-link';
import { InputTextField } from 'src/components/elements/input-text-field';
import { commonStyles } from 'src/styles';
import { useSubmitApiKey } from './useSubmitApiKey';

const RESAS_REGISTER_PAGE_URL = 'https://opendata.resas-portal.go.jp/form.html';

const styles = {
  foundation: css`
    height: calc(100vh - ${commonStyles.headerHeight} - ${commonStyles.footerHeight});
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  container: css`
    width: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    // border: 1px solid;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding-bottom: ${32 / 16}rem;
  `,
  title: css`
    margin: 0; // 縦幅リセット
    padding-top: ${24 / 16}rem;
  `,
  description: css`
    font-size: ${18 / 16}rem;
    margin-bottom: ${4 / 16}rem;
  `,
  form: css`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 1.5rem 2rem 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > :not(:last-child) {
      margin-bottom: 1rem;
    }

    position: relative;
  `,
  formLabel: css`
    font-size: ${16 / 16}rem;
    background-color: white;
    padding: 1px 3px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-50%) translateX(${12 / 16}rem);
  `
};

export const LoginPage = () => {
  const [apiKey, setApiKey] = useState('');
  const onInputApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const { onSubmitApiKey } = useSubmitApiKey(apiKey);

  const { apiClient } = useResasApiClient();
  useEffect(() => {
    if (apiClient.initialized()) {
      setApiKey(apiClient.resasApiKey);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div css={styles.foundation}>
      <div css={styles.container}>
        <h2 css={styles.title}>利用開始画面</h2>

        <p css={styles.description}>利用には RESAS API キーが必要です</p>
        <ExternalTextLink
          beforeLabel='※RESAS API キー の取得は'
          linkLabel='こちら'
          afterLabel='から'
          url={RESAS_REGISTER_PAGE_URL}
          fontSize={16}
          additionalStyles={css`
            margin-bottom: 2rem;
          `}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form css={styles.form} onSubmit={onSubmitApiKey}>
          <label css={styles.formLabel} htmlFor='apikey'>
            RESAS API キーを入力してください
          </label>
          <InputTextField
            placeholder='API キー'
            value={apiKey}
            onChange={onInputApiKey}
            additionalStyles={css`
              width: 16rem;
              height: ${36 / 16}rem;
            `}
          />
          <Button label='利用開始' type='submit' suffix={<BiLogIn size={`${22 / 16}rem`} color='white' />} />
        </form>
      </div>
    </div>
  );
};
