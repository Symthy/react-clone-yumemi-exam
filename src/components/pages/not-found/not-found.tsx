import { css } from '@emotion/react';
import { Button } from 'src/components/elements/button';
import { useRedirectTop } from 'src/routes/useRedirectTop';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-content: space-around;
  `,
  titleNum: css`
    font-size: 8rem;
    margin-top: 2rem;
  `,
  titleStr: css`
    font-size: 4rem;
    margin-bottom: 2rem;
  `
};

export const NotFoundPage = () => {
  const redirector = useRedirectTop();
  return (
    <div css={styles.container}>
      <div css={styles.titleNum}>404</div>
      <div css={styles.titleStr}>Not Found</div>
      <Button label='トップへ戻る' type='button' onClick={() => redirector()} />
    </div>
  );
};
