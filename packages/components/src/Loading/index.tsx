import React from 'react';
import { Loading } from '@kun-ui/icons';
import styled, { keyframes, withKunTheme } from '@kun-ui/styled';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default withKunTheme<any, any>(
  styled(Loading)`
    animation: ${rotate} linear 1.2s infinite;
  `,
  'KunLoading-icon',
);
