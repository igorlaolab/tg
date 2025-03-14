import React, { useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, styled, Stack } from '@mui/material';
import { Page } from '@/components/Page';
import Segmented from '@/components/UI/Segmented/Segmented';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import Range from '@/components/UI/Range/Range';
import Dropdown from '@/components/UI/Dropdown/Dropdown';

const TotalContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  marginBottom: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  height: '40px',
  alignItems: 'center',
  borderRadius: '4px',
  color: '#A1BDD9',
});

const ContentContainer = styled(Box)({
  flex: '1 1 auto', // Take up all available space
});

// // Список временных промежутков
const timeframes = [
  { label: '1H', value: '1h' },
  { label: '2H', value: '2h' },
  { label: '4H', value: '4h' },
  { label: '8H', value: '8h' },
  { label: '24H', value: '24h' },
];

export const OrderCreate: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<string>('limit');
  const [amount, setAmount] = useState<string>('0.21');
  const [price, setPrice] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(20);
  const [timeframe, setTimeframe] = useState<string>('2h');

  // Mock data
  const lastPrice = 103967.00;
  const availableUSDT = 128290.76;
  const availableBTC = 0.21;

  // Calculate total
  const total = parseFloat(amount) * (orderType === 'limit' ? (parseFloat(price) || lastPrice) : lastPrice);

  // Handle percentage selection
  const handlePercentageChange = (percentage: number) => {
    if (tradeType === 'buy') {
      const maxAmount = availableUSDT / lastPrice;
      setAmount((maxAmount * percentage / 100).toFixed(2));
    } else {
      setAmount((availableBTC * percentage / 100).toFixed(2));
    }
    setSliderValue(percentage);
  };

  // Обработчик для выбора типа ордера
  const handleOrderTypeChange = (selectedOrderType: string) => {
    setOrderType(selectedOrderType);
    // Если выбран market, можно сбросить цену или выполнить другие действия
    if (selectedOrderType === 'market') {
      setPrice('');
    }
  };

  // Обработчик для выбора временного промежутка
  const handleTimeframeChange = (selectedTimeframe: string) => {
    setTimeframe(selectedTimeframe);
  };

  return (
    <Page>
      <Stack justifyContent="space-between" sx={{ flex: 1 }}>
        <ContentContainer sx={{ mt: 3 }}>
          <Segmented
            segments={[
              { value: 'buy', label: 'Buy', activeColor: 'rgba(37, 90, 24, 0.25)', activeBorderColor: 'rgba(104, 255, 51, 1)' },
              { value: 'sell', label: 'Sell', activeColor: 'rgba(89, 46, 59, 0.35)', activeBorderColor: 'rgba(255, 30, 132, 1)' },
            ]}
            activeValue={tradeType}
            onChange={(value: string) => setTradeType(value as 'buy' | 'sell')}
          />

          {/* Order Type Dropdown */}
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#67819B', mb: 1, display: 'block' }}>
              Order Type
            </Typography>
            <Dropdown
              options={[
                { label: 'Limit', value: 'limit' },
                { label: 'Market', value: 'market' },
              ]}
              value={orderType}
              onChange={handleOrderTypeChange}
            />
          </Box>

          {/* Limit Price Input - показываем только для limit ордеров */}
          {orderType === 'limit' && (
            <Box sx={{ mb: 1 }}>
              <Input
                value={price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                placeholder={lastPrice.toString()}
                suffix="USDT"
                type="number"
                topLabel="Last price: $103,967.00"
              />
            </Box>
          )}

          {/* Amount Input */}
          <Box sx={{ mb: 1 }}>
            <Input
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              suffix="BTC"
              type="number"
              topLabel="Available: 128,290.76 USDT"
            />
          </Box>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Range
              value={sliderValue}
              onChange={(_event: Event, value: number | number[]) => {
                const newValue = typeof value === 'number' ? value : value[0];
                handlePercentageChange(newValue);
              }}
              marks
              step={1}
              min={0}
              max={100}
            />
          </Box>
          <TotalContainer sx={{ px: 1.5, py: 0.5 }}>
            <Typography variant="body1">Total</Typography>
            <Typography variant="body1">{total.toLocaleString()} USDT</Typography>
          </TotalContainer>

          {/* Timeframe Selector */}
          <Box sx={{ mt: 3, mb: 3 }}>
            <Segmented
              segments={timeframes}
              activeValue={timeframe}
              onChange={handleTimeframeChange}
              size="small"
            />
          </Box>
        </ContentContainer>

        {/* Submit Button at bottom */}
        <Box mb={1} sx={{ marginTop: 'auto' }}>
          <Button
            fullWidth
            variant={tradeType === 'buy' ? 'success' : 'error'}
            onClick={() => console.log(`Order placed: ${orderType} ${tradeType} ${amount} ${symbol} at ${orderType === 'limit' ? price : 'market'} for ${timeframe}`)}
          >
            {tradeType === 'buy' ? `Buy ${symbol?.toUpperCase()}` : `Sell ${symbol?.toUpperCase()}`}
          </Button>
        </Box>
      </Stack>
    </Page>
  );
};

export default OrderCreate;
