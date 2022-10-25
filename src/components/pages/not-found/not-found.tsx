import { css } from '@emotion/react';
import { useRedirectTop } from 'src/routes/useRedirectTop';
import { Button } from 'src/stories/Button';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-content: space-around;
  `,
  titleNum: css`
    font-size: 10rem;
    margin-top: 2rem;
  `,
  titleStr: css`
    font-size: 5rem;
    margin-bottom: 2rem;
  `
};

export const NotFoundPage = () => {
  const redirector = useRedirectTop();
  return (
    <div css={styles.container}>
      <div css={styles.titleNum}>404</div>
      <div css={styles.titleStr}>Not Found</div>
      <Button label='トップへ戻る' size='large' onClick={() => redirector()} />
    </div>
  );
};
