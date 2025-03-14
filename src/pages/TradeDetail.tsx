import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, styled, Avatar } from '@mui/material';
import TimeframeSelector from '@/components/UI/TimeframeSelector/TimeframeSelector';
import Button from '@/components/UI/Button/Button';
import chartImage from '../../assets/images/chart.svg';
import AIAnalyticsBlock from '@/components/UI/AIAnalyticsBlock/AIAnalyticsBlock';
import PositionsBlock from '@/components/UI/PositionsBlock/PositionsBlock';
import { FaArrowDown, FaArrowUp, FaChevronDown } from 'react-icons/fa';
import { Page } from '@/components/Page';

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const CoinInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const CoinName = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 500,
  '& svg': {
    marginLeft: '4px'
  }
});

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'right',
});

const Price = styled(Typography)({
  fontSize: '24px',
  fontWeight: 500,
  color: '#fff',
  textAlign: 'right',
});

const PriceChange = styled(Typography)<{ isNegative: boolean }>(({ isNegative }) => ({
  color: isNegative ? '#FF4D4F' : '#98E35E',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const ChartWrapper = styled(Box)({
  '& img': {
    width: '100%',
    height: 'auto',
  }
});

const TradeButton = styled(Button)({
  position: 'fixed',
  bottom: '70px',
  left: 0,
  right: 0,
  margin: 'auto',
  maxWidth: '600px',
  backgroundColor: '#28B550 !important',
  borderColor: '#28B550 !important',
  width: 'calc(100% - 30px) !important',
});

export const TradeDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [timeframe, setTimeframe] = useState('4h');
  const navigate = useNavigate();

  // Моковые данные
  const price = 195.96;
  const priceChange = -5.21;
  const aiMetrics = {
    news: 62,
    onchain: 17,
    etfInflow: 5,
    indicators: -13,
    total: 42,
  };
  const coinIcon = `https://cryptologos.cc/logos/${symbol}-${symbol?.toLowerCase()}-logo.png`;

  const positions = [
    {
      symbol: 'SOL',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 317.51,
      currentPrice: 323.52,
      pnl: 42.3,
      isProfit: true
    },
    {
      symbol: 'BTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 105170.88,
      currentPrice: 108234.10,
      pnl: 11.2,
      isProfit: false
    }
  ];

  // Функция для перехода на страницу создания ордера
  const handleTradeClick = () => {
    navigate(`/trade/${symbol}/order`);
  };

  return (
    <Page>
      <Box sx={{ pb: 1 }}>
        <HeaderContainer>
          <CoinInfo>
            <Avatar
              src={coinIcon}
              sx={{ width: 24, height: 24, backgroundColor: '#122a4b' }}
            />
            <CoinName>
              {symbol?.toUpperCase()} <FaChevronDown />
            </CoinName>
          </CoinInfo>
          <PriceContainer>
            <Price mr={1}>{price}</Price>
            <PriceChange isNegative={priceChange < 0}>
              {priceChange}%
              {priceChange < 0 ? <FaArrowDown style={{ marginLeft: '4px' }} /> : <FaArrowUp style={{ marginLeft: '4px' }} />}
            </PriceChange>
          </PriceContainer>
        </HeaderContainer>

        <ChartWrapper sx={{ mb: 2 }}>
          <img src={chartImage} alt="Price chart" />
        </ChartWrapper>

        <TimeframeSelector value={timeframe} onChange={setTimeframe} />

        <AIAnalyticsBlock metrics={aiMetrics} />

        <Box sx={{ mt: 3 }}>
          <PositionsBlock positions={positions} />
        </Box>

        <TradeButton fullWidth onClick={handleTradeClick}>
          Trade
        </TradeButton>
      </Box>
    </Page>
  );
};
