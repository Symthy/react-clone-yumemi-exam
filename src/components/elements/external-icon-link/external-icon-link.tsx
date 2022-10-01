import { ReactSVG } from 'react-svg';

type ExternalIconLinkProps = {
  svgFilePath: string;
  url: string;
  errorText: string;
  size: number;
};

export const ExternalIconLink = ({ svgFilePath, url, errorText, size }: ExternalIconLinkProps) => {
  const onOpenLink = () => window.open(url, '_blank');
  const onFailback = () => (
    <a style={{ cursor: 'pointer' }} href={url}>
      {errorText}
    </a>
  );

  return (
    <ReactSVG
      beforeInjection={(svg) => {
        svg.setAttribute('style', `width: ${size}; height: ${size}; cursor: pointer;`);
      }}
      src={svgFilePath}
      onClick={onOpenLink}
      fallback={onFailback}
    />
  );
};
