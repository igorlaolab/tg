import React, { useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

export interface Segment {
  label: string;
  value: string | number;
  activeColor?: string;
  activeBorderColor?: string;
  disabled?: boolean;
}

export interface SegmentedProps {
  segments: Segment[];
  activeValue: string | number;
  onChange: (value: string) => void;
  size?: 'default' | 'small';
}

const SegmentWrapper = styled.div<{ size: 'default' | 'small' }>`
  position: relative;
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: ${({ size }) => (size === 'small' ? '4px' : '5px')};
  border: 1px solid #19334d;
  overflow: hidden;
  height: ${({ size }) => (size === 'small' ? '28px' : '40px')};
  gap: ${({ size }) => (size === 'small' ? '8px' : '0')};
`;

const SegmentButton = styled.button<{
  active: boolean;
  disabled?: boolean;
  size: 'default' | 'small';
}>`
  flex: 1;
  padding: 0 4px;
  background-color: transparent;
  font-size: 12px;
  color: ${({ active }) => (active ? '#fff' : '#8b9cb6')};
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition:
    color 0.3s ease,
    opacity 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.85)};
  }
`;

const ActiveSegment = styled.div<{
  width: number;
  left: number;
  activeColor: string;
  activeBorderColor: string;
  size: 'default' | 'small';
}>`
  position: absolute;
  top: ${({ size }) => (size === 'small' ? '3px' : '5px')};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ size }) => (size === 'small' ? '20px' : 'calc(100% - 10px)')};
  background-color: ${({ activeColor }) => activeColor || '#122D48'};
  border: 1px solid ${({ activeBorderColor }) => activeBorderColor || '#0154a7'};
  border-radius: 4px;
  transition:
    left 0.3s ease,
    width 0.3s ease,
    background-color 0.3s ease;
`;

const Segmented: React.FC<SegmentedProps> = ({
  segments,
  activeValue,
  onChange,
  size = 'default',
}) => {
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [initialized, setInitialized] = useState(false);
  const [activeStyles, setActiveStyles] = useState<{
    width: number;
    left: number;
  }>({
    width: 0,
    left: 0,
  });

  const activeIndex = segments.findIndex(
    segment => segment.value === activeValue,
  );

  useLayoutEffect(() => {
    const currentSegment = segmentRefs.current[activeIndex];
    if (currentSegment) {
      setActiveStyles({
        width: currentSegment.offsetWidth,
        left: currentSegment.offsetLeft,
      });
      setInitialized(true);
    }
  }, [activeIndex, segments]);

  return (
    <SegmentWrapper size={size}>
      {initialized && activeIndex !== -1 && (
        <ActiveSegment
          width={activeStyles.width}
          left={activeStyles.left}
          activeColor={segments[activeIndex].activeColor || '#122D48'}
          activeBorderColor={
            segments[activeIndex].activeBorderColor || '#0154a7'
          }
          size={size}
        />
      )}
      {segments.map((segment, index) => (
        <SegmentButton
          key={segment.value}
          active={activeValue === segment.value}
          onClick={() => !segment.disabled && onChange(String(segment.value))}
          disabled={segment.disabled}
          ref={el => { segmentRefs.current[index] = el; }}
          size={size}
        >
          {segment.label}
        </SegmentButton>
      ))}
    </SegmentWrapper>
  );
};

export default Segmented;
