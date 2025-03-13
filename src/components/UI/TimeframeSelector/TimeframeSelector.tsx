import React from 'react';
import { Box } from '@mui/material';
import Segmented from '@/components/UI/Segmented/Segmented';

const timeframes = [
    { label: '1H', value: '1h' },
    { label: '4H', value: '4h' },
    { label: '12H', value: '12h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '1Y', value: '1y' },
    { label: 'All', value: 'all' },
];

interface TimeframeSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ value, onChange }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Segmented
                segments={timeframes}
                activeValue={value}
                onChange={onChange}
            />
        </Box>
    );
};

export default TimeframeSelector;
