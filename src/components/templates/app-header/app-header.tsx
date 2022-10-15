import { css } from '@emotion/react';
import { ExternalIconLink } from 'src/components/elements/external-icon-link';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem',
    border: 'solid',
    borderWidth: '2px 0'
  }),
  title: css({
    fontSize: '1rem',
    marginLeft: '1rem'
  }),
  links: css({
    marginRight: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }),
  linkWrpper: css({
    margin: '0 0.5rem'
  })
};

export const AppHeader = () => (
  <div css={styles.container}>
    <p css={styles.title}>都道府県別 総人口推移グラフ</p>
    <div css={styles.links}>
      <div css={styles.linkWrpper}>
        <ExternalIconLink
          svgFilePath='public/iconmonstr-github-1.svg'
          url='https://github.com/Symthy/react-clone-yumemi-exam'
          errorText='Code'
        />
      </div>
      <div css={styles.linkWrpper}>
        <ExternalIconLink
          svgFilePath='public/iconmonstr-twitter-1.svg'
          url='https://twitter.com/SYM_souten'
          errorText='Twitter'
        />
      </div>
    </div>
  </div>
);
