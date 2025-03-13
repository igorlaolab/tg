import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import UserProfileCard from '@/components/UI/UserProfileCard/UserProfileCard';
import CryptoPositionCard from '@/components/UI/CryptoPositionCard/CryptoPositionCard';
import TabPanel from '@/components/UI/TabPanel/TabPanel';
import Button from '@/components/UI/Button/Button'
import { Page } from '@/components/Page';

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const FriendRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 100px',
  marginBottom: '8px',
  fontSize: '14px',
  border: '1px solid rgba(28, 57, 101, 0.6)',
  borderRadius: '9px 8px 8px 9px',
  height: '37px'
});

const FriendNameWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#0e2d5a',
  height: '-webkit-fill-available',
  borderRadius: '8px 0 0 8px',
  padding: '12px',
});

const FriendPnL = styled(Typography)({
  fontWeight: 500,
  fontFamily: 'Gilroy',
  fontSize: '14px',
  padding: '8px 12px',
  textAlign: 'center',
  flex: 1,
  color: '#B4F35A',
});

const HeaderRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 16px',
  marginBottom: '8px',
});

const TermsContainer = styled(Box)({
  position: 'fixed',
  bottom: '55px',
  left: 0,
  right: 0,
  textAlign: 'center',
  padding: '8px 0',
  backgroundColor: 'rgba(12, 24, 42, 0.9)',
  backdropFilter: 'blur(5px)',
  zIndex: 10,
});

// Добавляем стиль для ссылки Terms of Service
const TermsLink = styled('a')({
  color: '#67819B',
  cursor: 'pointer',
  fontSize: '12px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  }
});

export const Me: React.FC = () => {
  const [activeTab, setActiveTab] = useState('friends');

  // Генерация случайного аватара
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;

  // Моковые данные друзей
  const friends = [
    { name: 'InvestSmart22', pnl: '12,345,678' },
    { name: 'ProfitHunter33', pnl: '10,111,000' },
    { name: 'WealthWizard99', pnl: '9,876,543' },
    { name: 'AlphaInvestor11', pnl: '8,999,999' },
    { name: 'TradeKing89', pnl: '8,230,561' },
    { name: 'FutureFinancier', pnl: '7,654,321' },
    { name: 'DividendDynamo', pnl: '6,789,012' },
    { name: 'EquityExpert77', pnl: '5,432,100' }
  ];

  // Данные позиций
  const positions = [
    {
      symbol: 'SOL',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$317.51',
      currentPrice: '$323.52',
      profitPercentage: '42.3%',
      isProfit: true
    },
    {
      symbol: 'BTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$105,170.88',
      currentPrice: '$108,234.10',
      profitPercentage: '11.2%',
      isProfit: false
    },
    {
      symbol: 'ETH',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$2,550.00',
      currentPrice: '$2,750.00',
      profitPercentage: '7.8%',
      isProfit: true
    },
    {
      symbol: 'LTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$150.00',
      currentPrice: '$155.00',
      profitPercentage: '3.3%',
      isProfit: true
    },
    {
      symbol: 'BNB',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$300.00',
      currentPrice: '$310.00',
      profitPercentage: '3.3%',
      isProfit: true
    },
    {
      symbol: 'XRP',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$0.50',
      currentPrice: '$0.52',
      profitPercentage: '4.0%',
      isProfit: true
    },
    {
      symbol: 'DOT',
      date: 'Jun 12, 2025 13:45',
      entryPrice: '$20.00',
      currentPrice: '$21.50',
      profitPercentage: '7.5%',
      isProfit: true
    }
  ];

  return (
    <Page back={false}>
    <Box sx={{ p: 2, pb: '60px' }}>
      <Box sx={{ px: 2 }}>
      {/* Профиль пользователя */}
      <UserProfileCard
        avatarUrl={avatarUrl}
        stats={{
          winrate: '76%',
          balance: '100,560.00 USDT',
          friends: '16'
        }}
      />

      {/* Кнопки действий */}
      <ButtonsContainer>
        <Button
          onClick={() => console.log('Connect Wallet')}
          fullWidth
        >Connect Wallet</Button>
        <Button
          onClick={() => console.log('Invite Friend')}
          fullWidth
        >Invite Friend</Button>
      </ButtonsContainer>
      </Box>

      {/* Вкладки */}
      <TabPanel
        tabs={[
          { label: 'My Positions', value: 'positions' },
          { label: 'My Friends', value: 'friends' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {activeTab === 'positions' ? (
          <Box>
            {positions.map((position, index) => (
              <CryptoPositionCard
                key={index}
                symbol={position.symbol}
                date={position.date}
                entryPrice={position.entryPrice}
                currentPrice={position.currentPrice}
                profitPercentage={position.profitPercentage}
                isProfit={position.isProfit}
              />
            ))}
          </Box>
        ) : (
          <Box>
            <HeaderRow>
              <Typography variant="subtitle1">Friend</Typography>
              <Typography variant="subtitle1">PnL</Typography>
            </HeaderRow>

            {friends.map((friend, index) => (
              <FriendRow key={index}>
                <FriendNameWrapper>
                  <Typography variant="h2" sx={{ color: '#FFFFFF' }}>
                    {friend.name}
                  </Typography>
                </FriendNameWrapper>
                <FriendPnL>
                  {friend.pnl}
                </FriendPnL>
              </FriendRow>
            ))}
          </Box>
        )}
      </TabPanel>

      {/* Фиксированный Terms of Service как ссылка */}
      <TermsContainer>
        <TermsLink href="/terms" target="_blank">
          Terms of Service
        </TermsLink>
      </TermsContainer>
    </Box>
    </Page>
  );
};
