import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import Button from '@/components/UI/Button/Button';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

// Styled Components
const ModalOverlay = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#091e3f',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999999,
});

const HeaderContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Symbol = styled(Typography)({
    fontSize: '32px',
    textTransform: 'uppercase',
    color: '#fff',
});

const PriceContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

const Price = styled(Typography)({
    fontSize: '24px',
    fontWeight: 500,
    color: '#fff',
});

const PriceChange = styled(Typography)<{ isNegative: boolean }>(({ isNegative }) => ({
    color: isNegative ? '#FF4D4F' : '#98E35E',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
}));

const OrderTitle = styled(Typography)({
    fontSize: '24px',
    color: 'white',
    textAlign: 'center',
});

const InfoContainer = styled(Box)({
    backgroundColor: 'rgba(16, 28, 43, 0.6)',
    borderRadius: '8px',
});

const InfoRow = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});

const InfoLabel = styled(Typography)({
    fontSize: '14px',
    color: 'rgba(143, 170, 197, 1)',
});

const InfoValue = styled(Typography)({
    fontSize: '14px',
    color: 'white',
    fontWeight: '500',
});

const PnlValue = styled(Typography)<{ isPositive: boolean }>(({ isPositive }) => ({
    fontSize: '16px',
    color: isPositive ? 'rgba(152, 227, 94, 1)' : '#FF4D4F',
    fontWeight: '500',
}));

const ButtonContainer = styled(Box)({
    marginTop: 'auto',
    width: '100%',
});

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    symbol: string;
    orderType: string;
    tradeType: 'buy' | 'sell';
    price: string;
    amount: string;
    timeframe: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
    isOpen,
    onClose,
    symbol = 'SOL',
    orderType,
    tradeType,
    price,
    amount,
    timeframe,
}) => {
    if (!isOpen) return null;
  console.log(    orderType,
    tradeType,
    price,
    amount,
    timeframe,)
    // Mock data
    const currentPrice = 195.96;
    const priceChange = -5.21;
    const openDate = 'Jun 5, 2025 13:47';
    const entryPrice = 195.42;
    const currentPriceValue = 198.34;
    const pnl = 3.42;
    const timeLeft = '54m 13s';

    return (
        <ModalOverlay>
            <HeaderContainer sx={{ mt: 5 }}>
                <Symbol sx={{ mb: 1 }}>
                    {symbol}
                </Symbol>

                <PriceContainer>
                    <Price>
                        {currentPrice.toFixed(2)}
                    </Price>
                    <PriceChange isNegative={priceChange < 0} sx={{ ml: 1 }}>
                        {priceChange > 0 ? '+' : ''}{priceChange}%
                        {priceChange < 0
                            ? <FaArrowDown style={{ marginLeft: 4 }} />
                            : <FaArrowUp style={{ marginLeft: 4 }} />}
                    </PriceChange>
                </PriceContainer>
            </HeaderContainer>

            <OrderTitle sx={{ mb: 2, mt: 6 }}>
                Order
            </OrderTitle>

            <InfoContainer sx={{ py: 2, px: 4, mb: 3 }}>
                <InfoRow sx={{ mb: 1 }}>
                    <InfoLabel>
                        Opened
                    </InfoLabel>
                    <InfoValue>
                        {openDate}
                    </InfoValue>
                </InfoRow>

                <InfoRow sx={{ mb: 1 }}>
                    <InfoLabel>
                        Entry Price
                    </InfoLabel>
                    <InfoValue>
                        ${entryPrice.toFixed(2)}
                    </InfoValue>
                </InfoRow>

                <InfoRow sx={{ mb: 1 }}>
                    <InfoLabel>
                        Current Price
                    </InfoLabel>
                    <InfoValue>
                        ${currentPriceValue.toFixed(2)}
                    </InfoValue>
                </InfoRow>

                <InfoRow sx={{ mb: 1 }}>
                    <InfoLabel>
                        PnL
                    </InfoLabel>
                    <PnlValue isPositive={pnl > 0}>
                        {pnl > 0 ? '+' : ''}{pnl}%
                    </PnlValue>
                </InfoRow>

                <InfoRow>
                    <InfoLabel>
                        Time Left
                    </InfoLabel>
                    <InfoValue>
                        {timeLeft}
                    </InfoValue>
                </InfoRow>
            </InfoContainer>

            <ButtonContainer sx={{ px: 2, pb: 3 }}>
                <Button
                    fullWidth
                    variant="primary"
                    onClick={onClose}
                >
                    Dismiss
                </Button>
            </ButtonContainer>
        </ModalOverlay>
    );
};

export default OrderModal;
