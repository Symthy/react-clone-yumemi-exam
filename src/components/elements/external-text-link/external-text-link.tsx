type ExternalTextLinkProps = {
  label: string;
  url: string;
  fontSize?: number;
};

export const ExternalTextLink = ({ label, url, fontSize }: ExternalTextLinkProps) => {
  const fontStyle = fontSize ? { 'font-size': `${fontSize / 16}rem` } : {};
  const linkStyle = {
    cursor: 'pointer',
    ...fontStyle
  };
  return (
    <a style={linkStyle} href={url}>
      {label}
    </a>
  );
};
