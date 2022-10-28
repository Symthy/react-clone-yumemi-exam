import { css } from '@emotion/react';
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai';
import { headerHeight, themeColor } from 'src/styles';

const styles = {
  container: css`
    height: ${headerHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-width: 2px 0;
    background-color: ${themeColor};
  `,
  title: css`
    color: white;
    font-size: 1rem;
    margin-left: 1rem;
  `,
  links: css`
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  linkWrpper: css`
    margin: 0 0.5rem;
  `
};

export const AppHeader = () => (
  <header css={styles.container}>
    <p css={styles.title}>都道府県別 総人口推移グラフ</p>
    <div css={styles.links}>
      <div css={styles.linkWrpper}>
        <a href='https://github.com/Symthy/react-clone-yumemi-exam'>
          <AiFillGithub size='2rem' color='white' />
        </a>
      </div>
      <div css={styles.linkWrpper}>
        <a href='https://twitter.com/SYM_souten'>
          <AiFillTwitterCircle size='2rem' color='white' />
        </a>
      </div>
    </div>
  </header>
);
