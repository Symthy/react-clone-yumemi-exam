import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { cssMergerSupplier } from '../supplier';

export const StyledDescription = styled.p(
  cssMergerSupplier(css`
    font-size: ${18 / 16}rem;
  `)
);
