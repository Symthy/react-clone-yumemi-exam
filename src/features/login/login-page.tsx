import { ChangeEvent, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { BiLogIn } from 'react-icons/bi';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { Button } from 'src/components/elements/button';
import { ExternalTextLink } from 'src/components/elements/external-text-link';
import { LabelForm } from 'src/components/elements/label-form';
import { StyledDescription } from 'src/components/styled/description';
import { StyledInputTextField } from 'src/components/styled/input-text-field';
import { StyledTitle } from 'src/components/styled/title/title';
import { makeAttrForTest } from 'src/fixture/attributeBuilder';
import { commonStyles } from 'src/styles';
import { useSubmitApiKey } from './hooks/useSubmitApiKey';

const RESAS_REGISTER_PAGE_URL = 'https://opendata.resas-portal.go.jp/form.html';

const styles = {
  foundation: css`
    height: calc(100vh - ${commonStyles.headerHeight} - ${commonStyles.footerHeight});
    ${commonStyles.flexRowDefault}
  `,
  container: css`
    width: 30rem;
    ${commonStyles.flexColumnDefault}

    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding-bottom: ${32 / 16}rem;
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
        <StyledTitle
          css={css`
            padding-top: ${24 / 16}rem;
          `}
          {...makeAttrForTest('login-page-title')}
        >
          利用開始画面
        </StyledTitle>
        <StyledDescription
          css={css`
            margin-bottom: ${4 / 16}rem;
          `}
        >
          利用には RESAS API キーが必要です
        </StyledDescription>
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
        <LabelForm label='RESAS API キーを入力してください' onSubmit={onSubmitApiKey}>
          <StyledInputTextField
            placeholder='API キー'
            value={apiKey}
            type='password'
            onChange={onInputApiKey}
            css={css`
              width: 16rem;
              height: ${36 / 16}rem;
            `}
            {...makeAttrForTest('login-apikey-field')}
          />
          <Button
            label='利用開始'
            type='submit'
            suffix={<BiLogIn size={`${22 / 16}rem`} color='white' />}
            {...makeAttrForTest('login-btn')}
          />
        </LabelForm>
      </div>
    </div>
  );
};
