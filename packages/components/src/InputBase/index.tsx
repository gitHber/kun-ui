import React from 'react';
import styled, { withKunTheme } from '@kun-ui/styled';

export default withKunTheme<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
  // any
>(
  styled.input`
    border: none;
    outline: none;
    padding: 0;
    &::placeholder {
      font-size: 14px;
      padding: 0;
      color: ${p => p.theme.palette.disabled};
    }
  `,
  'KunInputBase-root',
);
