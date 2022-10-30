import { FallbackProps } from 'react-error-boundary';
import { css } from '@emotion/react';
import { HiXCircle } from 'react-icons/hi';
import { Button } from 'src/components/elements/button';
import { TitleBodyLayout } from 'src/components/elements/title-body-layout';
import { useRedirectTop } from 'src/routes/useRedirectTop';

const styles = {
  container: css`
    margin-top: 2rem;
  `,
  title: css`
    display: inline-flex;
    align-items: center;
    margin-left: 0.5rem;
  `,
  titleLabel: css`
    margin: 0;
    margin-left: 0.5rem;
  `,
  description: css`
    margin-left: 1.2rem;
  `,
  btnArea: css`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  `
};

export const ErrorFallback = ({ error }: FallbackProps) => {
  const redirector = useRedirectTop();
  return (
    <div css={styles.container}>
      <div css={styles.title}>
        <HiXCircle color='#e41010' size={30} />
        <h2 css={styles.titleLabel}>予期せぬエラーが発生しました</h2>
      </div>
      <div css={styles.description}>
        <p>Internal Server Error の場合はしばらく待ってから再度実行してください</p>
        <p>そうでない場合、Github Issues もしくは Twitter から製作者に問い合わせてください</p>
      </div>
      <TitleBodyLayout
        title='Error Detail'
        existsBorder
        additionalStyles={css`
          padding: 1rem;
        `}
      >
        <pre>{error.message}</pre>
      </TitleBodyLayout>
      <div css={styles.btnArea}>
        <Button label='トップへ戻る' type='button' onClick={() => redirector()} />
      </div>
    </div>
  );
};
