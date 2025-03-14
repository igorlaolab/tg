import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIAnalytics from '@/components/UI/AIAnalytics/AIAnalytics';

const ShowMore = styled(Typography)({
    color: '#98E35E',
    fontSize: '12px',
    textAlign: 'right',
    cursor: 'pointer',
});

const AnalyticsWrapper = styled(Box)({
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    '&:hover': {
        opacity: 0.9,
    },
});

interface AIAnalyticsBlockProps {
    metrics: {
        news: number;
        onchain: number;
        etfInflow: number;
        indicators: number;
        total: number;
    };
    symbol?: string;
}

const AIAnalyticsBlock: React.FC<AIAnalyticsBlockProps> = ({ metrics, symbol }) => {
    const navigate = useNavigate();

    const handleShowMoreClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        navigate(`/analytics/${symbol || 'all'}`);
    };

    const handleBlockClick = () => {
        navigate(`/analytics/${symbol || 'all'}`);
    };

    return (
        <AnalyticsWrapper onClick={handleBlockClick}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">AI Analytics</Typography>
                <ShowMore onClick={handleShowMoreClick}>Show more</ShowMore>
            </Box>
            <AIAnalytics metrics={metrics} />
        </AnalyticsWrapper>
    );
};

export default AIAnalyticsBlock;
