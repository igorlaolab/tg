import React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

interface RangeProps {
    value: number;
    onChange: (event: Event, value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    marks?: boolean;
    disabled?: boolean;
    className?: string;
}

// Custom styled slider component
const StyledSlider = styled(Slider)(() => ({
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#2E5493',
    },
    '& .MuiSlider-rail': {
        backgroundColor: '#122a4b',
    },
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid #2E5493',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -30%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -30%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
}));

const SliderContainer = styled(Box)({
    padding: '0 12px',
    marginTop: '16px',
    marginBottom: '16px',
});

const Range: React.FC<RangeProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    marks = false,
    disabled = false,
    className,
}) => {
    return (
        <SliderContainer className={className}>
            <StyledSlider
                value={value}
                onChange={onChange}
                aria-labelledby="range-slider"
                step={step}
                min={min}
                max={max}
                marks={marks}
                disabled={disabled}
                valueLabelDisplay="auto"
            />
        </SliderContainer>
    );
};

export default Range;
