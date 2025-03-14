import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import UserProfileCard from '@/components/UI/UserProfileCard/UserProfileCard';
import FriendListCard from '@/components/UI/FriendListCard/FriendListCard';
import TabPanel from '@/components/UI/TabPanel/TabPanel';
import Button from '@/components/UI/Button/Button'
import { Page } from '@/components/Page';
import PositionsBlock from "@/components/UI/PositionsBlock/PositionsBlock.tsx";
import { useUserPhoto } from '@/hooks/useUserPhoto';

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

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
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

  // Используем хук вместо генерации случайного аватара
  const avatarUrl = useUserPhoto();

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
      entryPrice: 317.51,
      currentPrice: 323.52,
      pnl: 42.3,
      isProfit: true
    },
    {
      symbol: 'BTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 105.17088,
      currentPrice: 108.23410,
      pnl: 11.2,
      isProfit: false
    },
    {
      symbol: 'ETH',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 255000,
      currentPrice: 2.75000,
      pnl: 7.8,
      isProfit: true
    },
    {
      symbol: 'LTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 150.00,
      currentPrice: 155.00,
      pnl: 3.3,
      isProfit: true
    },
    {
      symbol: 'BNB',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 300.00,
      currentPrice: 310.00,
      pnl: 3.3,
      isProfit: true
    },
    {
      symbol: 'XRP',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 0.50,
      currentPrice: 0.52,
      pnl: 4.0,
      isProfit: true
    },
    {
      symbol: 'DOT',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 20.00,
      currentPrice: 21.50,
      pnl: 7.5,
      isProfit: true
    }
  ];

  return (
    <Page back={false}>
      <Box sx={{ pb: '60px' }}>
        <Box sx={{ px: 1.5 }}>
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
            <PositionsBlock positions={positions} />
          ) : (
            <FriendListCard friends={friends} />
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
