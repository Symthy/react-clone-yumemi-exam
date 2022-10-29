import { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { commonStyles } from 'src/styles';

const styles = {
  foundation: css`
    box-sizing: content-box;
  `,
  container: css`
    box-sizing: content-box;
    position: relative;
  `,
  border: css`
    border: 1px solid ${commonStyles.themeColor};
  `,
  title: css`
    padding: 1px 3px;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-50%) translateX(${10 / 16}rem);
    background-color: white; ;
  `,
  body: css`
    padding: 1rem;
  `
};

type TitleBodyLayoutProps = {
  title: string;
  children: ReactNode;
  existsBorder?: boolean;
  additionalStyles?: SerializedStyles;
};

export const TitleBodyLayout = ({ title, children, existsBorder = false, additionalStyles }: TitleBodyLayoutProps) => {
  const containerStyles = existsBorder ? [styles.container, styles.border] : [styles.container];
  return (
    <div css={[styles.foundation, additionalStyles]}>
      <div css={containerStyles}>
        <p css={styles.title}>{title}</p>
        <div css={styles.body}>{children}</div>
      </div>
    </div>
  );
};
