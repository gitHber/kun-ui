import React, { useContext, useCallback } from 'react';
import { useControlState } from '@kun-ui/hooks';
import styled, { useKunTheme } from '@kun-ui/styled';
import clsx from 'clsx';
import CheckboxGroupContext from './CheckboxGroupContext';
import IconButton, { Props as IconButtonProps } from '../IconButton';

const Wrap = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  &.KunCheckbox-checked {
    .KunCheckbox-icon {
      background-color: ${p => p.theme.palette.primary.main};
      border-color: ${p => p.theme.palette.primary.main};
    }
  }
  &.KunCheckbox-disabled {
    cursor: not-allowed;
    .KunCheckbox-label {
      cursor: not-allowed;
      &:hover {
        background: none;
      }
    }
    .KunCheckbox-icon {
      border-color: #b3b3b3;
      background-color: #e8e8e8;
      &::after {
        border-color: transparent;
      }
    }
    &.KunCheckbox-checked .KunCheckbox-icon::after {
      border-color: #b3b3b3;
    }
    .KunCheckbox-text {
      color: ${p => p.theme.palette.text.hint};
    }
  }
  .KunCheckbox-label {
    position: relative;
    padding: 10px;
  }
  .KunCheckbox-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    margin: 0;
    opacity: 0;
  }
  .KunCheckbox-icon {
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
    background-color: #fff;
    border-radius: ${p => p.theme.shape.borderRadius}px;
    &::after {
      content: '';
      width: 4px;
      height: 7px;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      background-color: transparent;
    }
  }
  .KunCheckbox-text {
    color: ${p => p.theme.palette.text.primary};
    font-size: 14px;
    line-height: 1;
  }
`;

interface EventTarget {
  value: any;
  checked: boolean;
  name: string;
  disabled: boolean;
}
export interface Props extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /**
   * 自动获取焦点
   */
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string;
  name?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement> | ((instance: HTMLInputElement) => void);
  /**
   * 使用IconButton实现，注入IconButton的样式
   */
  IconButtonProps?: IconButtonProps;
  onChange?: (e: React.MouseEvent & { target: EventTarget }) => void;
}

const Checkbox = React.forwardRef<any, Props>(
  (
    {
      value,
      defaultChecked = false,
      inputRef,
      disabled = false,
      className,
      children,
      name,
      IconButtonProps = {},
      onChange,
      ...props
    },
    ref,
  ) => {
    const theme = useKunTheme();
    const context = useContext(CheckboxGroupContext);
    const contextValue = context?.value || context?.defaultValue;

    const [checked, setChecked] = useControlState(
      'checked' in props || !!context,
      !!context ? contextValue.includes?.(value) : props.checked,
      defaultChecked,
    );
    const handleChange = useCallback(
      e => {
        e.preventDefault();
        if (disabled) return;

        if (!('checked' in props)) {
          setChecked(!checked);
        }

        context?.onChange(
          !checked ? [...contextValue, value] : contextValue.filter(v => v !== value),
        );
        e.target = {
          value,
          checked: !checked,
          name: context?.name || name,
          disabled: context?.disabled,
        };
        onChange?.(e);
        props.onClick?.(e);
      },
      [context, checked, onChange, props.onClick, disabled],
    );
    return (
      <Wrap
        theme={theme}
        className={clsx(className, 'KunCheckbox-root', {
          'KunCheckbox-checked': checked,
          'KunCheckbox-disabled': context?.disabled || disabled,
        })}
        onClick={handleChange}
        ref={ref}
        {...props}
      >
        <IconButton
          component="span"
          variant="text"
          color="primary"
          className="KunCheckbox-label"
          {...IconButtonProps}
        >
          <input
            className="KunCheckbox-input"
            ref={inputRef}
            type="checkbox"
            value={value}
            checked
            name={context?.name || name}
            readOnly
          />
          <span className="KunCheckbox-icon"></span>
        </IconButton>
        {children && <span className="KunCheckbox-text">{children}</span>}
      </Wrap>
    );
  },
);

export default Checkbox;
