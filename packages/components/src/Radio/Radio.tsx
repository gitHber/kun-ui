import styled, { useKunTheme } from '@kun-ui/styled';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import IconButton, { Props as IconButtonProps } from '../IconButton';
import useRadio, { EventTarget } from './useRadio';

const Wrap = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  &.KunRadio-checked {
    .KunRadio-icon {
      background-color: ${p => p.theme.palette.primary.main};
      border-color: ${p => p.theme.palette.primary.main};
    }
  }
  &.KunRadio-disabled {
    cursor: not-allowed;
    .KunRadio-label {
      cursor: not-allowed;
      &:hover {
        background: none;
      }
    }
    .KunRadio-icon {
      border-color: #b3b3b3;
      background-color: #e8e8e8;
      &::after {
        background: #b3b3b3;
      }
    }
    &:not(.KunRadio-checked) .KunRadio-icon::after {
      background: #e8e8e8;
    }
    .KunRadio-text {
      color: ${p => p.theme.palette.text.hint};
    }
  }
  .KunRadio-label {
    position: relative;
    padding: 10px;
  }
  .KunRadio-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    margin: 0;
    opacity: 0;
    &:focus + .KunRadio-icon {
      box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.08);
    }
  }
  .KunRadio-icon {
    transition: all ${p => p.theme.transitions.duration.short}ms
      ${p => p.theme.transitions.easing.easeInOut};
    display: block;
    position: relative;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-width: 2px;
    border-color: #b3b3b3;
    border-style: solid;
    border-radius: 50%;
    background-color: #fff;
    &::after {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
  }
  .KunRadio-text {
    color: ${p => p.theme.palette.text.primary};
    font-size: 14px;
    line-height: 1;
  }
`;

export interface Props extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  name?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement> | ((instance: HTMLInputElement) => void);
  IconButtonProps?: IconButtonProps;
  onChange?: (e: React.MouseEvent & { target: EventTarget }) => void;
}

const Radio = React.forwardRef<any, Props>(
  (
    {
      value,
      autoFocus,
      defaultChecked = false,
      inputRef,
      disabled = false,
      className,
      children,
      onChange,
      name,
      IconButtonProps = {},
      ...props
    },
    ref,
  ) => {
    const theme = useKunTheme();
    const { handleChange, handleInputRef, context, checked } = useRadio({
      isControlled: 'checked' in props,
      defaultChecked,
      checked: props.checked,
      value,
      disabled,
      inputRef,
      onChange,
      autoFocus,
    });

    const handleClick = useCallback(
      e => {
        handleChange?.(e);
        props.onClick?.(e);
      },
      [handleChange, props.onClick],
    );

    return (
      <Wrap
        {...props}
        theme={theme}
        className={clsx(className, 'KunRadio-root', {
          'KunRadio-checked': checked,
          'KunRadio-disabled': context?.disabled || disabled,
        })}
        onClick={handleClick}
        ref={ref}
      >
        <IconButton
          component="span"
          variant="text"
          color="primary"
          className="KunRadio-label"
          enableTouchRipple={!disabled}
          {...IconButtonProps}
        >
          <input
            className="KunRadio-input"
            ref={handleInputRef}
            type="radio"
            value={value || children}
            checked
            name={context?.name || name}
            readOnly
          />
          <span className="KunRadio-icon"></span>
        </IconButton>
        {children && <span className="KunRadio-text">{children}</span>}
      </Wrap>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
