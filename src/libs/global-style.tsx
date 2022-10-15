import { css, Global } from '@emotion/react';
import sanitize from 'sanitize.css';
import forms from 'sanitize.css/forms.css';
import typography from 'sanitize.css/typography.css';

export const styles = css`
  ${sanitize}
  ${typography}
  ${forms}
`;

export const GlobalStyles = () => <Global styles={styles} />;
