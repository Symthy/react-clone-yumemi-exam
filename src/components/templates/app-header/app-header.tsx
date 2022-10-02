import { css } from '@emotion/react';
import { ExternalIconLink } from 'src/components/elements/external-icon-link';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4em',
    border: 'solid',
    borderWidth: '0.1em 0em'
  }),
  title: css({
    marginLeft: '1em'
  }),
  links: css({
    paddingTop: '0.5em',
    marginRight: '1em',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }),
  linkWrpper: css({
    margin: '0 0.5em'
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
