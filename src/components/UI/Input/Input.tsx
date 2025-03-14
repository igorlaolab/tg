import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'suffix' | 'leftIcon' | 'rightIcon'
  > {
  height?: 'H40' | 'H36' | 'H32' | 'H28'; // Варианты высоты
  filled?: boolean;
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  topLabel?: string;
  bottomLabel?: string;
  align?: 'left' | 'right';
  prefixColor?: string;
  suffixColor?: string;
  topLabelColor?: string;
  // story book props
  showTopLabel?: boolean;
  showBottomLabel?: boolean;
  showPrefix?: boolean;
  showSuffix?: boolean;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const TopLabel = styled.label<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const BottomLabel = styled.label<{ error?: boolean }>`
  color: ${({ error }) => (error ? '#FF1E84' : '#a1bdd9')};
  font-size: 10px;
  font-weight: 500;
  margin-top: 8px;
`;

const InputBase = styled.div<InputProps>`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 25%);
  border-radius: 6px;
  border: 1px solid #19334d;
  transition:
    border-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  color: white;
  font-family: 'Noto Sans', sans-serif;

  ${props =>
    props.height === 'H40' &&
    css`
      height: 40px;
      font-size: 14px;
      padding: 8px 12px;
    `}
  ${props =>
    props.height === 'H36' &&
    css`
      height: 36px;
      font-size: 14px;
      padding: 8px 12px;
    `}
  ${props =>
    props.height === 'H32' &&
    css`
      height: 32px;
      font-size: 12px;
      padding: 4px 10px;
    `}
  ${props =>
    props.height === 'H28' &&
    css`
      height: 28px;
      font-size: 12px;
      padding: 4px 8px;
    `}

  ${props =>
    props.filled &&
    css`
      //background-color: #000;
    `}

  ${props =>
    props.error &&
    css`
      border-color: #ff1e84;
    `}

  &:hover {
    border-color: ${({ disabled }) =>
      disabled
        ? '#222f3d'
        : '#0088ff'}; // Изменение цвета границы при наведении
  }

  ${props =>
    props.disabled &&
    css`
      background-color: rgba(34, 47, 61, 50%);
      color: #6d727a;
      border-color: #222f3d;
      cursor: not-allowed;
    `}
`;

const StyledInput = styled.input<{ align?: 'left' | 'right' }>`
  flex-grow: 1;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  text-align: ${({ align }) => (align === 'right' ? 'right' : 'left')};

  ::placeholder {
    color: #67819b;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Input: FC<InputProps> = ({
  height = 'H40',
  filled = false,
  error = false,
  prefix,
  suffix,
  leftIcon,
  rightIcon,
  topLabel,
  bottomLabel,
  disabled,
  align = 'left',
  prefixColor = '#A1BDD9',
  suffixColor = '#A1BDD9',
  topLabelColor = '#a1bdd9',
  ...props
}) => (
  <InputWrapper>
    {topLabel && <TopLabel color={topLabelColor}>{topLabel}</TopLabel>}
    <InputBase
      height={height}
      filled={filled}
      error={error}
      disabled={disabled}
    >
      {leftIcon && (
        <div style={{ display: 'flex', marginRight: '8px' }}>{leftIcon}</div>
      )}
      {prefix && (
        <div
          style={{ display: 'flex', marginRight: '4px', color: prefixColor }}
        >
          {prefix}
        </div>
      )}
      <StyledInput align={align} disabled={disabled} {...props} />
      {suffix && (
        <div style={{ marginLeft: '4px', color: suffixColor }}>{suffix}</div>
      )}
      {rightIcon && (
        <div style={{ display: 'flex', marginLeft: '8px' }}>{rightIcon}</div>
      )}
    </InputBase>
    {bottomLabel && (
      <BottomLabel className="bottomLabel" error={error}>
        {bottomLabel}
      </BottomLabel>
    )}
  </InputWrapper>
);

export default Input;
