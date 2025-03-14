import { FC, useState, useEffect, ReactNode, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FaChevronDown, FaXmark, FaCheck } from 'react-icons/fa6';

interface Option {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: Option[];
  height?: 'H40' | 'H36' | 'H32' | 'H28' | 'H22';
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  leftIcon?: ReactNode;
  topLabel?: string;
  bottomLabel?: string;
  disabled?: boolean;
  prefixColor?: string;
  suffixColor?: string;
  onChange?: (value: string) => void;
  searchable?: boolean;
  variant?: 'normal' | 'light';
  value?: string;
  onBlur?: (e: any) => void;
}

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const DropdownBase = styled.div<{
  height?: string;
  error?: boolean;
  disabled?: boolean;
  variant: 'normal' | 'light';
}>`
  display: flex;
  align-items: center;
  background-color: ${({ variant }) =>
    variant === 'light' ? 'rgba(63,87,112,20%)' : 'rgba(0, 0, 0, 25%)'};
  border-radius: 6px;
  border: 1px solid #19334d;
  border: 1px solid
    ${({ variant }) =>
      variant === 'light' ? 'rgba(255,255,255,8%)' : '#19334d'};
  color: white;
  transition:
    border-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  position: relative;

  ${({ height }) =>
    height === 'H40' &&
    css`
      height: 40px;
      font-size: 14px;
      padding: 8px 12px;
    `}
  ${({ height }) =>
    height === 'H36' &&
    css`
      height: 36px;
      font-size: 14px;
      padding: 12px 12px;
    `}
  ${({ height }) =>
    height === 'H32' &&
    css`
      height: 32px;
      font-size: 12px;
      padding: 4px 10px;
    `}
  ${({ height }) =>
    height === 'H28' &&
    css`
      height: 28px;
      font-size: 12px;
      padding: 4px 8px;
    `}

  ${({ height }) =>
    height === 'H22' &&
    css`
      height: 22px;
      font-size: 10px;
      padding: 4px 8px;
    `}

  ${({ error }) =>
    error &&
    css`
      border-color: #ff1e84;
    `}

  &:hover {
    border-color: ${({ disabled }) => (disabled ? '#222f3d' : '#0088ff')};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: rgba(34, 47, 61, 50%);
      cursor: not-allowed;
      color: #6d727a;
    `}
`;

const DropdownList = styled.ul<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: fit-content;
  min-width: 100%;
  max-width: 180%;
  background-color: rgba(15, 23, 31, 60%);
  backdrop-filter: blur(8px);
  border: 1px solid #3f5770;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  scrollbar-width: thin; /* Firefox */
  padding-left: 0;
  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(63, 87, 112, 0.4);
  }

  &::-webkit-scrollbar-button,
  &::-webkit-scrollbar-corner {
    display: none;
  }
`;

const DropdownItem = styled.li<{
  selected?: boolean;
  highlighted?: boolean;
  height?: string;
  disabled?: boolean;
}>`
  padding: ${({ height }) =>
    height === 'H22' ? '6px' : height === 'H28' ? '8px' : '11px'};
  color: white;
  cursor: pointer;
  font-size: ${({ height }) =>
    height === 'H22' ? '10px' : height === 'H28' ? '12px' : '14px'};
  background-color: ${({ highlighted }) =>
    highlighted ? '#293a4b' : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  &:hover {
    background-color: #0080ff;
  }
`;

const SearchInput = styled.input<{
  height?: string;
  error?: boolean;
  selected?: boolean;
}>`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  outline: none;

  ::placeholder {
    color: ${({ selected }) => (selected ? 'white' : '#67819b')};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const OptionPrefix = styled.span`
  font-family: 'Inter', sans-serif;
  margin-right: 12px;
`;

const OptionSuffix = styled.span`
  color: #a1bdd9;
  margin-left: 12px;
`;

const NoOptionsMessage = styled.li`
  text-align: center;
  color: #67819b;
  padding: 20px 10px;
  background-color: rgba(15, 23, 31, 60%);
  border-radius: 6px;
`;

const Dropdown: FC<DropdownProps> = ({
  options,
  height = 'H40',
  error = false,
  prefix,
  suffix,
  leftIcon,
  topLabel,
  bottomLabel,
  disabled = false,
  prefixColor = '#A1BDD9',
  suffixColor = '#A1BDD9',
  onChange,
  searchable = false,
  variant = 'normal',
  value,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchable) {
      setFilteredOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options, searchable]);

  const handleOptionSelect = (value: string) => {
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
    if (onChange) onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        setHighlightedIndex(prevIndex =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;
      case 'ArrowUp':
        setHighlightedIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
        break;
      case 'Enter':
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleOptionSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleClearSelection = () => {
    if (onChange) onChange('');
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBlur = () => {
    if (!value) {
      setSearchTerm(''); // Очистка инпута при потере фокуса
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  const selectedOption = options.find(option => option.value === value);

  const handleBlurEvent = (e: any) => {
    handleBlur();
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <DropdownWrapper ref={dropdownRef} onKeyDown={handleKeyDown}>
      {topLabel && (
        <div
          style={{ fontSize: '11px', marginBottom: '8px', color: '#A1BDD9' }}
        >
          {topLabel}
        </div>
      )}
      <DropdownBase
        height={height}
        error={error}
        disabled={disabled}
        onClick={toggleDropdown}
        variant={variant}
        onBlur={handleBlurEvent}
      >
        {leftIcon && (
          <div style={{ display: 'flex', marginRight: '8px' }}>{leftIcon}</div>
        )}
        {prefix && (
          <div
            style={{
              display: 'flex',
              marginRight: '4px',
              color: prefixColor,
              userSelect: 'none',
            }}
          >
            {prefix}
          </div>
        )}
        {searchable ? (
          <SearchInput
            height={height}
            error={error}
            value={searchTerm || selectedOption?.label || ''}
            selected={!!selectedOption}
            onChange={e => {
              if (!isOpen) setIsOpen(true);
              setSearchTerm(e.target.value);
            }}
            placeholder={selectedOption ? selectedOption.label : 'Select'}
            onBlur={handleBlur}
            disabled={disabled}
          />
        ) : (
          <div
            style={{
              flex: 1,
              color: selectedOption ? 'white' : '#67819b',
              cursor: disabled ? 'not-allowed' : 'default',
              letterSpacing: '0.4px',
              whiteSpace: 'nowrap',
              textAlign: 'left',
            }}
          >
            {selectedOption ? selectedOption.label : 'Select'}
          </div>
        )}
        {suffix && (
          <div style={{ marginLeft: '4px', color: suffixColor }}>{suffix}</div>
        )}
        <div
          style={{ display: 'flex', marginLeft: '8px', cursor: 'pointer' }}
          onClick={
            selectedOption && searchable ? handleClearSelection : undefined
          }
        >
          {selectedOption && searchable ? <FaXmark /> : <FaChevronDown />}
        </div>
      </DropdownBase>
      {bottomLabel && (
        <div
          style={{ marginTop: '4px', color: error ? '#ff1e84' : 'white' }}
          className="bottomLabel"
        >
          {bottomLabel}
        </div>
      )}
      <DropdownList open={isOpen}>
        {filteredOptions.length === 0 ? (
          <NoOptionsMessage>No options</NoOptionsMessage>
        ) : (
          filteredOptions.map((option, index) => (
            <DropdownItem
              key={index}
              selected={option.value === selectedOption?.value}
              highlighted={index === highlightedIndex}
              onMouseDown={() => handleOptionSelect(option.value)}
              height={height}
              disabled={option.disabled}
            >
              <div>
                {option.prefix && <OptionPrefix>{option.prefix}</OptionPrefix>}
                <span>{option.label}</span>
                {option.suffix && <OptionSuffix>{option.suffix}</OptionSuffix>}
              </div>
              {option.value === selectedOption?.value && (
                <FaCheck style={{ marginLeft: '8px' }} />
              )}
            </DropdownItem>
          ))
        )}
      </DropdownList>
    </DropdownWrapper>
  );
};

export default Dropdown;
