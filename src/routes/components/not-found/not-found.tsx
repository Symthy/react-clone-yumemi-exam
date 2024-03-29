import { css } from '@emotion/react';
import { Button } from 'src/components/elements/button';
import { useMakeAttrForTest } from 'src/fixture/useMakeAttrForTest';
import { useRedirectTop } from 'src/routes/hooks/useRedirectTop';
import { commonStyles } from 'src/styles';

const styles = {
  container: css`
    ${commonStyles.flexColumnDefault}
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
  const makeAttrForTest = useMakeAttrForTest();
  const redirector = useRedirectTop();
  return (
    <div css={styles.container}>
      <div css={styles.titleNum}>404</div>
      <div css={styles.titleStr} {...makeAttrForTest('not-found-label')}>
        Not Found
      </div>
      <Button label='トップへ戻る' type='button' onClick={redirector} {...makeAttrForTest('top-return-btn')} />
    </div>
  );
};
