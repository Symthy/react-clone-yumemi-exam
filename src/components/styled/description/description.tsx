import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { cssMerger } from '../builder';

export const StyledDescription = styled.p(
  cssMerger(css`
    font-size: ${18 / 16}rem;
  `)
);
