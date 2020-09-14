import React from 'react';
import styled, { useKunTheme, DefaultTheme } from '@kun-ui/styled';
import { Fade } from '../transitions';
import clsx from 'clsx';

const Template = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  -webkit-tap-highlight-color: transparent;
  background-color: rgba(0, 0, 0, 0.3);
  &.invisible {
    background-color: transparent;
  }
`;

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 蒙层是否透明
   */
  invisible?: boolean;
  className?: string;
  /**
   * 提供动画组件，默认Fade
   */
  TransitionComponent?: React.ComponentType;
  /**
   * 动画组件的props
   */
  TransitionProps?: any;
  theme?: DefaultTheme;
  /**
   * 蒙层的显示隐藏
   */
  in?: boolean;
}
/**
 * 背景蒙层
 */
const Backdrop: React.FC<Props> = ({
  invisible = false,
  TransitionComponent = Fade,
  children,
  TransitionProps,
  className,
  in: inProps,
  ...props
}) => {
  const theme = useKunTheme();
  return (
    <TransitionComponent in={inProps} {...TransitionProps}>
      <Template
        theme={theme}
        className={clsx('KunBackdrop-root', className, { invisible: invisible })}
        {...props}
      >
        {children}
      </Template>
    </TransitionComponent>
  );
};

export default Backdrop;
