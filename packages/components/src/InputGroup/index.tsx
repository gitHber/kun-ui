import React, { useState, useRef } from 'react';
import styled, { withKunTheme } from '@kun-ui/styled';
import clsx from 'clsx';

const StyleWrap = styled.span`
  display: inline-flex;
  align-items: center;
  * {
    border-radius: 0;
  }
  *:hover {
    z-index: 1;
  }
  *:not(:last-child) {
    margin-right: -1px;
  }
  *:first-child {
    border-radius: ${p => p.theme.shape.borderRadius}px 0 0 ${p => p.theme.shape.borderRadius}px;
  }
  *:last-child {
    border-radius: 0 ${p => p.theme.shape.borderRadius}px ${p => p.theme.shape.borderRadius}px 0;
  }
`;

export interface Props extends React.HTMLAttributes<HTMLElement>, React.DOMAttributes<HTMLElement> {
  size?: 'small' | 'medium' | 'large';
}

const InputGroup: React.ForwardRefRenderFunction<HTMLSpanElement, Props> = (
  { size = 'medium', children, ...props },
  ref,
) => {
  return (
    <StyleWrap {...props} ref={ref}>
      {React.Children.map(children, child => React.cloneElement(child as any, { size }))}
    </StyleWrap>
  );
};

export default withKunTheme(InputGroup, 'KunInputGroup-root');
