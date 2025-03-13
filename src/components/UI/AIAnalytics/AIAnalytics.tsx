import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const AnalyticsContainer = styled(Box)({
    backgroundColor: 'rgba(29, 56, 95, 0.6)',
    borderRadius: '10px',
    display: 'flex',
    overflow: 'hidden',
});

const MetricBox = styled(Box)({
    flex: 1,
    padding: '12px 8px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    '&:last-child': {
        borderRight: 'none',
        backgroundColor: 'rgba(22, 87, 36, 0.6)',
    }
});

const MetricLabel = styled(Typography)({
    color: '#fff',
    fontSize: '14px',
    marginBottom: '4px',
});

const MetricValue = styled(Box)<{ isPositive: boolean }>(({ isPositive }) => ({
    color: isPositive ? '#98E35E' : '#FF4D4F',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
}));

interface AIAnalyticsProps {
    metrics: {
        news: number;
        onchain: number;
        etfInflow: number;
        indicators: number;
        total: number;
    };
}

const AIAnalytics: React.FC<AIAnalyticsProps> = ({ metrics }) => {
    return (
        <AnalyticsContainer>
            <MetricBox>
                <MetricLabel>News</MetricLabel>
                <MetricValue isPositive={metrics.news > 0}>
                    {metrics.news}%
                    <FaArrowTrendUp />
                </MetricValue>
            </MetricBox>
            <MetricBox>
                <MetricLabel>Onchain</MetricLabel>
                <MetricValue isPositive={metrics.onchain > 0}>
                    {metrics.onchain}%
                    <FaArrowTrendUp />
                </MetricValue>
            </MetricBox>
            <MetricBox>
                <MetricLabel>ETF Inflow</MetricLabel>
                <MetricValue isPositive={metrics.etfInflow > 0}>
                    {metrics.etfInflow}%
                    <FaArrowTrendUp />
                </MetricValue>
            </MetricBox>
            <MetricBox>
                <MetricLabel>Indicators</MetricLabel>
                <MetricValue isPositive={metrics.indicators > 0}>
                    {metrics.indicators}%
                    <FaArrowTrendDown />
                </MetricValue>
            </MetricBox>
            <MetricBox>
                <MetricLabel>Total</MetricLabel>
                <MetricValue isPositive={metrics.total > 0}>
                    {metrics.total}%
                    <FaArrowTrendUp />
                </MetricValue>
            </MetricBox>
        </AnalyticsContainer>
    );
};

export default AIAnalytics; 