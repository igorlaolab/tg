import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import AIAnalytics from '@/components/UI/AIAnalytics/AIAnalytics';

const ShowMore = styled(Typography)({
    color: '#98E35E',
    fontSize: '12px',
    textAlign: 'right',
    cursor: 'pointer',
});

interface AIAnalyticsBlockProps {
    metrics: {
        news: number;
        onchain: number;
        etfInflow: number;
        indicators: number;
        total: number;
    };
}

const AIAnalyticsBlock: React.FC<AIAnalyticsBlockProps> = ({ metrics }) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">AI Analytics</Typography>
                <ShowMore>Show more</ShowMore>
            </Box>
            <AIAnalytics metrics={metrics} />
        </>
    );
};

export default AIAnalyticsBlock;
