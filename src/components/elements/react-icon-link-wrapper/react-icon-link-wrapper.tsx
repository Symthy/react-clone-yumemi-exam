import { ReactElement } from 'react';
import { css } from '@emotion/react';
import { IconType } from 'react-icons/lib';

const styles = css`
  margin: 0 0.5rem;
`;

type IconLinkWrapperProps = {
  icon: ReactElement<IconType>;
  url: string;
};

export const IconLinkWrapper = ({ icon, url }: IconLinkWrapperProps) => (
  <div css={styles}>
    <a href={url}>{icon}</a>
  </div>
);
