import { useEventCallback } from '@kun-ui/hooks';
import styled, { useKunTheme } from '@kun-ui/styled';
import React, { useRef } from 'react';
import TouchRipple, { RefProps } from './TouchRipple';
import clsx from 'clsx';

const StyleButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 0;
  cursor: pointer;
  transition: background-color 250ms ${p => p.theme.transitions.easing.easeInOut} 0ms,
    box-shadow 250ms ${p => p.theme.transitions.easing.easeInOut} 0ms,
    border 250ms ${p => p.theme.transitions.easing.easeInOut} 0ms;
  .KunButton-label {
    width: 100%;
  }
  &:focus {
    outline: 0;
  }
`;

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * 波纹效果
   */
  enableTouchRipple?: boolean;
  /**
   * 设置center，波纹从中间扩散，否则点击位置扩散
   */
  center?: boolean;
  component?: keyof JSX.IntrinsicElements;
  type?: string;
  href?: string;
}
const ButtonBase = React.forwardRef<any, Props>(
  (
    {
      children,
      component = 'button',
      enableTouchRipple = true,
      center = false,
      type = 'button',
      href,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchMove,
      onTouchStart,
      onTouchEnd,
      ...props
    },
    ref,
  ) => {
    const rippleRef = useRef<RefProps>();
    const theme = useKunTheme();
    const useRippleHnadler = (
      rippleAction,
      eventCallback,
      skipRippleAction = !enableTouchRipple,
    ) => {
      return useEventCallback(event => {
        if (!skipRippleAction && rippleRef) {
          rippleRef.current[rippleAction](event);
        }
        eventCallback?.();
        return true;
      });
    };
    const handleMouseDown = useRippleHnadler('start', onMouseDown);
    const handleMouseUp = useRippleHnadler('stop', onMouseUp);
    const handleMouseLeave = useRippleHnadler('stop', onMouseLeave);
    const handleTouchStart = useRippleHnadler('start', onTouchStart);
    const handleTouchEnd = useRippleHnadler('stop', onTouchEnd);
    const handleTouchMove = useRippleHnadler('stop', onTouchMove);

    const buttonProps: any = {};
    if (component === 'button') {
      buttonProps.type = type;
    } else {
      if (component !== 'a' || !href) {
        buttonProps.role = 'button';
      }
    }

    return (
      <StyleButtonBase
        {...props}
        {...buttonProps}
        className={clsx('KunButtonBase-root', props.className)}
        theme={theme}
        ref={ref}
        as={component as any}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {children}
        {enableTouchRipple ? <TouchRipple ref={rippleRef} center={center} /> : null}
      </StyleButtonBase>
    );
  },
);

export default ButtonBase;
