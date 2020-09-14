import React from 'react';
import styled, { borderCss, withKunTheme } from '@kun-ui/styled';

const Selection = styled.div<any>`
  ${borderCss}
  height: 32px;
  outline: 0;
`;

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Select: React.FC<Props> = ({ ...props }, ref) => {
  return <Selection tabIndex="0" {...props} ref={ref}></Selection>;
};

export default withKunTheme(Select, 'KunSelect-root');
