import { css, SerializedStyles } from '@emotion/react';

const styles = css`
  display: inline-flex;
  align-items: center;
  > * {
    margin: 0;
  }
`;

type ExternalTextLinkProps = {
  beforeLabel?: string;
  linkLabel: string;
  afterLabel?: string;
  url: string;
  fontSize?: number;
  additionalStyles?: SerializedStyles;
};

export const ExternalTextLink = ({
  beforeLabel,
  linkLabel,
  afterLabel,
  url,
  fontSize,
  additionalStyles
}: ExternalTextLinkProps) => {
  const fontStyle = fontSize ? { fontSize: `${fontSize / 16}rem` } : {};
  const linkStyle = {
    cursor: 'pointer',
    ...fontStyle
  };
  return (
    <div css={[styles, additionalStyles]}>
      <p style={linkStyle}>{beforeLabel}</p>
      <a style={linkStyle} href={url}>
        {linkLabel}
      </a>
      <p style={linkStyle}>{afterLabel}</p>
    </div>
  );
};
