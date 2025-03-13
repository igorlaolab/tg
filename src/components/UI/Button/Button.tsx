import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const iconSpacings = {
  H40: '8px',
  H36: '6px',
  H32: '6px',
  H28: '4px',
  H22: '2px',
};

// Типизация для пропсов кнопки
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'negative'
  | 'light'
  | 'transparent';
  size?: 'H40' | 'H36' | 'H32' | 'H28' | 'H22';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  minWidth?: string | number;
}

const ButtonBase = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  z-index: 9;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    `}

  ${props =>
    props.size &&
    css`
      height: ${props.size.replace('H', '')}px;
      ${props.size === 'H40' && 'padding: 0 24px;'}
      ${props.size === 'H36' && 'padding: 0 16px;'}
      ${props.size === 'H32' && 'padding: 0 14px;'}
      ${props.size === 'H28' && 'padding: 0 10px; font-size: 12px;'}
      ${props.size === 'H22' && 'padding: 0 8px; font-size: 10px;'}
    `}

  ${props =>
    props.variant === 'primary' &&
    css`
      background-color: #1c77ff;
      border: 1px solid #3399ff;
      color: white;

      &:hover {
        background-color: #3399ff;
        border-color: #66b3ff;
      }

      &:disabled {
        background-color: #013e7a;
        border-color: #013e7a;
        color: #67819b;
        cursor: not-allowed;
      }
    `}
  
  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: #1b3d5f;
      color: white;
      border: 1px solid #31506f;

      &:hover {
        background-color: #3399ff;
      }

      &:disabled {
        background-color: rgba(27, 61, 95, 40%);
        color: #8faac5;
        cursor: not-allowed;
      }
    `}

  ${props =>
    props.variant === 'outlined' &&
    css`
      background-color: rgba(63, 87, 112, 0.2);
      color: white;
      border: 1px solid #388bdd;

      &:hover {
        background-color: #3399ff;
      }

      &:disabled {
        border-color: #3f5770;
        color: #67819b;
        cursor: not-allowed;
      }
    `}

  ${props =>
    props.variant === 'negative' &&
    css`
      background-color: #b3055b;
      color: white;
      border: 1px solid rgba(255, 0, 116, 40%);

      &:hover {
        background-color: #cc0464;
      }

      &:disabled {
        background-color: rgba(255, 0, 116, 40%);
        border-color: transparent;
        color: #8faac5;
        cursor: not-allowed;
      }
    `}

  ${props =>
    props.variant === 'light' &&
    css`
      background-color: rgba(67, 87, 112, 20%);
      border: 1px solid rgba(255, 255, 255, 8%);
      color: white;

      &:hover {
        background-color: rgba(255, 255, 255, 6%);
      }

      &:disabled {
        background-color: rgba(27, 61, 95, 40%);
        border-color: transparent;
        color: #8faac5;
        cursor: not-allowed;
      }
    `}

  ${props =>
    props.variant === 'transparent' &&
    css`
      background-color: transparent;
      border: 1px solid transparent;
      color: white;

      &:hover {
        background-color: rgba(255, 255, 255, 6%);
        border: 1px solid rgba(255, 255, 255, 8%);
      }

      &:disabled {
        background-color: rgba(27, 61, 95, 40%);
        border-color: transparent;
        color: #8faac5;
        cursor: not-allowed;
      }
    `}

  svg {
    display: flex;
    ${({ startIcon, endIcon, size }) =>
    startIcon &&
    !endIcon &&
    css`
        margin-right: ${iconSpacings[size || 'H40']};
      `}
    ${({ startIcon, endIcon, size }) =>
    !startIcon &&
    endIcon &&
    css`
        margin-left: ${iconSpacings[size || 'H40']};
      `}
    ${({ startIcon, endIcon, size }) =>
    startIcon &&
    endIcon &&
    css`
        &:first-child {
          margin-right: ${iconSpacings[size || 'H40']};
        }
        &:last-child {
          margin-left: ${iconSpacings[size || 'H40']};
        }
      `}
  }
`;

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'H40',
  startIcon,
  endIcon,
  disabled = false,
  fullWidth,
  minWidth,
  ...props
}) => (
  <ButtonBase
    variant={variant}
    size={size}
    disabled={disabled}
    startIcon={startIcon}
    endIcon={endIcon}
    fullWidth={fullWidth}
    minWidth={minWidth}
    {...props}
  >
    {startIcon}
    {children}
    {endIcon}
  </ButtonBase>
);

export default Button;
