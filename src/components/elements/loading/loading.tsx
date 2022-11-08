import { Oval } from 'react-loader-spinner';
import { css } from '@emotion/react';
import { commonStyles } from 'src/styles';

const styles = css`
  ${commonStyles.flexRowDefault}
`;

export const Loading = () => (
  <div css={styles}>
    <Oval
      height={50}
      width={50}
      color='#4fa94d'
      wrapperStyle={{}}
      wrapperClass=''
      visible
      ariaLabel='oval-loading'
      secondaryColor='#4fa94d'
      strokeWidth={5}
      strokeWidthSecondary={4}
    />
  </div>
);
