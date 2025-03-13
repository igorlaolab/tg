import React from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';

const PositionCardContainer = styled(Paper)({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    borderRadius: '10px',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    overflow: 'hidden',
});

const PositionContent = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px 0 0 10px',
});

const CurrencyName = styled(Typography)({
    fontSize: '13px',
    fontWeight: 500,
    color: '#fff',
});

const DateText = styled(Typography)({
    fontSize: '10px',
    color: '#67819B',
});

const PriceLabel = styled(Typography)({
    fontSize: '10px',
    color: '#67819B',
    width: '80px',
    textAlign: 'right',
    paddingRight: '4px',
});

const PriceValue = styled(Typography)<{ profit?: boolean | null }>(({ profit }) => ({
    fontSize: '11px',
    color: profit === true
        ? '#00FF47'
        : profit === false
            ? '#FF4747'
            : '#fff',
}));

const ProfitIndicator = styled(Box)<{ profit: boolean }>(({ profit }) => ({
    backgroundColor: profit ? 'rgba(152, 227, 94, 0.15)' : 'rgba(255, 77, 79, 0.15)',
    borderRadius: '0 10px 10px 0',
    color: profit ? '#98E35E' : '#FF4D4F',
    fontSize: '11px',
    fontWeight: 500,
    width: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

interface CryptoPositionCardProps {
    symbol: string;
    date: string;
    entryPrice: string;
    currentPrice: string;
    profitPercentage: string;
    isProfit: boolean;
}

const CryptoPositionCard: React.FC<CryptoPositionCardProps> = ({
    symbol,
    date,
    entryPrice,
    currentPrice,
    profitPercentage,
    isProfit
}) => {
    return (
        <PositionCardContainer>
            <PositionContent>
                <Box>
                    <CurrencyName>{symbol}</CurrencyName>
                    <DateText>{date}</DateText>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PriceLabel>Entry Price:</PriceLabel>
                        <PriceValue>{entryPrice}</PriceValue>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PriceLabel>Current Price:</PriceLabel>
                        <PriceValue profit={isProfit}>{currentPrice}</PriceValue>
                    </Box>
                </Box>
            </PositionContent>
            <ProfitIndicator profit={isProfit}>
                {isProfit ? '+' : ''}{profitPercentage}
            </ProfitIndicator>
        </PositionCardContainer>
    );
};

export default CryptoPositionCard; 