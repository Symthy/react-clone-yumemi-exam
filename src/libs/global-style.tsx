import { css, Global } from '@emotion/react';
import sanitize from 'sanitize.css';
import typography from 'sanitize.css/typography.css';

export const styles = css`
  ${sanitize}
  ${typography}
`;

export const GlobalStyles = () => <Global styles={styles} />;
