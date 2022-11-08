import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { cssMergerSupplier } from '../supplier';

export const StyledTitle = styled.h2(
  cssMergerSupplier(css`
    margin: 0; // 縦幅リセット
  `)
);
