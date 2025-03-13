import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const PositionItem = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    borderRadius: '10px',
    overflow: 'hidden',
});

const PositionDetails = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px 0 0 10px',
});

const CurrencyText = styled(Typography)({
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

const ProfitBox = styled(Box)<{ profit: boolean }>(({ profit }) => ({
    backgroundColor: profit ? 'rgba(152, 227, 94, 15%)' : 'rgba(255, 77, 79, 15%)',
    borderRadius: '0 10px 10px 0',
    color: profit ? '#98E35E' : '#FF4D4F',
    fontSize: '11px',
    fontWeight: 500,
    width: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

interface Position {
    symbol: string;
    date: string;
    entryPrice: number;
    currentPrice: number;
    pnl: number;
    isProfit: boolean;
}

interface PositionsBlockProps {
    positions: Position[];
}

const PositionsBlock: React.FC<PositionsBlockProps> = ({ positions }) => {
    // Функция для форматирования цены
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
        }).format(price);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">Your Positions</Typography>
                <Typography variant="subtitle1" sx={{ width: '60px', textAlign: 'center' }}>PnL</Typography>
            </Box>

            {positions.length > 0 ? (
                positions.map((position, index) => (
                    <PositionItem key={index}>
                        <PositionDetails>
                            <Box>
                                <CurrencyText>{position.symbol}</CurrencyText>
                                <DateText>{position.date}</DateText>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PriceLabel>Entry Price:</PriceLabel>
                                    <PriceValue>{formatPrice(position.entryPrice)}</PriceValue>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PriceLabel>Current Price:</PriceLabel>
                                    <PriceValue profit={position.isProfit}>{formatPrice(position.currentPrice)}</PriceValue>
                                </Box>
                            </Box>
                        </PositionDetails>
                        <ProfitBox profit={position.isProfit}>
                            {position.isProfit ? '+' : ''}{position.pnl}%
                        </ProfitBox>
                    </PositionItem>
                ))
            ) : (
                <Typography variant="body2" sx={{ color: '#67819B', textAlign: 'center' }}>
                    No open positions
                </Typography>
            )}
        </>
    );
};

export default PositionsBlock;
