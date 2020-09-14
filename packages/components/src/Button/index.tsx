import React from 'react';
import ButtonBase, { Props as ButtonBaseProps } from '../ButtonBase';
import { Zoom } from '../transitions/Zoom';
import Loading from '../Loading';
import styled, { useKunTheme, Colors } from '@kun-ui/styled';
import clsx from 'clsx';

const StyleButton = styled(ButtonBase)<
  Props & {
    $color: Props['color'];
  }
>`
  &.KunButton-sm {
    height: 26px;
    font-size: 12px;
    padding: 7px 12px;
  }
  &.KunButton-lg {
    height: 36px;
    padding: 11px 20px;
  }
  &.KunButton-outlined {
    border: 1px solid;
    background-color: transparent;
    color: ${p => p.theme.palette[p.$color].main};
    &:not(.KunButton-disabled):hover {
      background-color: ${p => p.theme.palette[p.$color].light1};
      border-color: ${p => p.theme.palette[p.$color].light};
    }
    &:not(.KunButton-disabled):active {
      background-color: ${p => p.theme.palette[p.$color].dark1};
      border-color: ${p => p.theme.palette[p.$color].dark};
    }
  }
  &.KunButton-text {
    border: 1px solid transparent;
    background-color: transparent;
    color: ${p => p.theme.palette[p.$color].main};
    &:not(.KunButton-disabled):hover {
      background-color: ${p => p.theme.palette[p.$color].light1};
    }
    &:not(.KunButton-disabled):active {
      background-color: ${p => p.theme.palette[p.$color].dark1};
    }
  }
  height: 32px;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: 9px 14px;
  border-radius: ${p => p.theme.shape.borderRadius}px;
  font-size: 14px;
  background-color: ${p => (p.$color === 'inherit' ? '#f5f5f5' : p.theme.palette[p.$color].main)};
  color: ${p => p.theme.palette[p.$color].contrastText};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: ${p => p.theme.shadows[p.disableElevation || p.disabled ? 0 : 2]};

  &:not(.KunButton-disabled):hover {
    background-color: ${p => p.theme.palette[p.$color].light};
    box-shadow: ${p => p.theme.shadows[p.disableElevation ? 0 : 4]};
  }
  &:not(.KunButton-disabled):active {
    background-color: ${p => p.theme.palette[p.$color].dark};
    box-shadow: ${p => p.theme.shadows[p.disableElevation ? 0 : 8]};
  }

  svg {
    vertical-align: -0.15em;
  }
`;

const ButtonLabel = styled.span`
  width: 100%;
  .KunButton-label-loading {
    margin-right: 5px;
  }
`;
const StartIcon = styled.span`
  margin-right: 4px;
`;
const EndIcon = styled.span`
  margin-left: 4px;
`;

export interface Props extends ButtonBaseProps {
  /**
   * button类型
   */
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  /**
   * 是否隐藏阴影
   */
  disableElevation?: boolean;
  /**
   * 颜色:对应主题中的颜色定义
   */
  color?: Colors | 'inherit';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}
const Button = React.forwardRef<any, Props>(
  (
    {
      variant = 'contained',
      size = 'medium',
      color = 'inherit',
      disabled = false,
      disableElevation = false,
      children,
      startIcon,
      endIcon,
      loading,
      ...props
    },
    ref,
  ) => {
    const theme = useKunTheme();
    return (
      <StyleButton
        ref={ref}
        theme={theme}
        variant={variant}
        size={size}
        $color={color}
        disabled={disabled || loading}
        disableElevation={variant === 'contained' ? disableElevation : true}
        {...props}
        className={clsx('KunButton-root', `KunButton-${variant}-${color}`, props.className, {
          'KunButton-sm': size === 'small',
          'KunButton-lg': size === 'large',
          'KunButton-outlined': variant === 'outlined',
          'KunButton-text': variant === 'text',
          'KunButton-disabled': disabled,
        })}
      >
        <ButtonLabel className="KunButton-label">
          <Zoom attr="width" direction="left" in={loading} unmountOnExit mountOnEnter>
            <span>
              <Loading className="KunButton-label-loading" />
            </span>
          </Zoom>
          {startIcon && <StartIcon className="KunButton-startIcon">{startIcon}</StartIcon>}
          {children}
          {endIcon && <EndIcon className="KunButton-endIcon">{endIcon}</EndIcon>}
        </ButtonLabel>
      </StyleButton>
    );
  },
);

export default Button;
