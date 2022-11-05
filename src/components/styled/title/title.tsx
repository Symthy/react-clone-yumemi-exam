import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { cssMerger } from '../builder';

export const StyledTitle = styled.h2(
  cssMerger(css`
    margin: 0; // 縦幅リセット
  `)
);
