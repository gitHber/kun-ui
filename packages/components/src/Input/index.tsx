import React, { useRef, useCallback } from 'react';
import styled, { useKunTheme, css, borderCss, DefaultTheme } from '@kun-ui/styled';
import { useControlState, useForkRef, setRef } from '@kun-ui/hooks';
import { CloseFillCircle } from '@kun-ui/icons';
import clsx from 'clsx';
import InputBase from '../InputBase';

const wrapCss = css<PropsWithoutSize>`
  padding: 4px 10px;
  font-size: 14px;
  &.KunInput-sm {
    padding: 0px 10px;
    font-size: 12px;
  }
  &.KunInput-lg {
    padding: 8px 10px;
    font-size: 16px;
  }
`;
const placeholderCss = css<PropsWithoutSize>`
  &::placeholder {
    font-size: 14px;
    line-height: 22px;
  }
  &.KunInput-sm::placeholder {
    font-size: 12px;
  }
  &.KunInput-lg::placeholder {
    font-size: 16px;
  }
  &:placeholder-shown {
    color: ${p => p.theme.palette.disabled};
    text-overflow: ellipsis;
  }
`;

const StyleInput = styled(InputBase)<React.InputHTMLAttributes<HTMLInputElement> & any>`
  ${borderCss}
  ${wrapCss}
  ${placeholderCss}
  cursor: ${p => (p.disabled ? 'not-allowed' : 'inherit')};
`;

const Wrap = styled.span<PropsWithoutSize>`
  ${borderCss}
  ${wrapCss}
  cursor: text;
  display: inline-flex;
  align-items: center;
  .KunInput-input {
    ${placeholderCss}
  }
  &:hover .KunInput-clear-visible {
    opacity: 1;
    cursor: pointer;
  }
`;
const Clear = styled(CloseFillCircle)`
  color: rgba(0, 0, 0, 0.3);
  cursor: text;
  opacity: 0;
  transition: opacity ${p => p.theme.transitions.duration.short}ms
    ${p => p.theme.transitions.easing.easeInOut} 0ms;
`;

export interface Props extends Omit<React.HTMLAttributes<HTMLElement>, 'size' | 'prefix' | 'ref'> {
  size?: 'small' | 'medium' | 'large';
  allowClear?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  ref?: React.MutableRefObject<HTMLElement> | ((instance: HTMLInputElement) => void);
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  inputProps?: React.HTMLAttributes<HTMLInputElement>;
  value?: string | number | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  theme?: DefaultTheme;
  autoComplete?: string;
  name?: string;
}

type PropsWithoutSize = Omit<Props, 'size'> & { size: 'small' | 'medium' | 'large' };

const Input = React.forwardRef<any, Props>(
  (
    {
      placeholder = '请输入',
      allowClear = false,
      size = 'medium',
      prefix,
      suffix,
      inputRef,
      inputProps = {},
      defaultValue = '',
      onChange,
      disabled = false,
      className,
      autoComplete,
      name,
      ...props
    },
    ref,
  ) => {
    const theme = useKunTheme();
    const isControlled = 'value' in props;
    const [value, setValue] = useControlState(isControlled, props.value, defaultValue);
    const handleChange = useCallback(
      e => {
        console.log('onChange ,,,,,,');

        onChange?.(e);
        if (!isControlled) {
          setValue(e.target.value);
        }
      },
      [isControlled],
    );
    const selfInputRef = useRef<HTMLInputElement>();
    const handleInputRef = useForkRef(inputRef, selfInputRef);

    const handleClear = useCallback(
      e => {
        onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
        if (!isControlled) {
          setValue('');
        }
      },
      [isControlled],
    );
    const handleClick = e => {
      props.onClick?.(e);
      selfInputRef.current.focus();
    };
    if (!suffix && !prefix && !allowClear) {
      return (
        <StyleInput
          {...props}
          {...inputProps}
          className={clsx(className, 'KunInput-root', {
            'Kun-disabled': disabled,
            'KunInput-sm': size === 'small',
            'KunInput-lg': size === 'large',
          })}
          ref={refValue => {
            setRef(ref, refValue);
            setRef(handleInputRef, refValue);
          }}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          size={size}
          autoComplete={autoComplete}
          name={name}
          theme={theme}
        />
      );
    }
    return (
      <Wrap
        {...props}
        onClick={handleClick}
        className={clsx(className, {
          'Kun-disabled': disabled,
          'KunInput-sm': size === 'small',
          'KunInput-lg': size === 'large',
        })}
        size={size}
        disabled={disabled}
        ref={ref}
        theme={theme}
      >
        {prefix}
        <InputBase
          {...inputProps}
          className={clsx('KunInput-input', 'KunInput-root', inputProps.className)}
          ref={handleInputRef}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          autoComplete={autoComplete}
          name={name}
        />
        {allowClear && (
          <Clear
            className={clsx('KunInput-input-clear', {
              'KunInput-clear-visible': Boolean(value),
            })}
            theme={theme}
            onClick={handleClear}
          />
        )}
        {suffix}
      </Wrap>
    );
  },
);

Input.displayName = 'Input';

export default Input;
