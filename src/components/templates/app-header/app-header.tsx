import { css } from '@emotion/react';
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai';
import { IconLinkWrapper } from 'src/components/elements/react-icon-link-wrapper';
import { commonStyles } from 'src/styles';

const styles = {
  container: css`
    height: ${commonStyles.headerHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-width: 2px 0;
    background-color: ${commonStyles.themeColor};
  `,
  title: css`
    color: white;
    font-size: 1.2rem;
    margin-left: 1rem;
  `,
  links: css`
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
};

type AppHeaderProps = {
  title?: string;
};

export const AppHeader = ({ title = '都道府県別 総人口推移グラフ' }: AppHeaderProps) => (
  <header css={styles.container}>
    <h1 css={styles.title}>{title}</h1>
    <div css={styles.links}>
      <IconLinkWrapper
        url='https://github.com/Symthy/react-clone-yumemi-exam'
        icon={<AiFillGithub size='2rem' color='white' title='Code' />}
      />
      <IconLinkWrapper
        url='https://twitter.com/SYM_souten'
        icon={<AiFillTwitterCircle size='2rem' color='white' title='Creater' />}
      />
    </div>
  </header>
);
