import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';
import Segmented from '@/components/UI/Segmented/Segmented'
import { LuUsersRound } from "react-icons/lu";
import { Page } from '@/components/Page';

const SeasonBadge = styled(Paper)({
  backgroundColor: 'rgba(28, 57, 101, 0.6)',
  borderRadius: '6px',
  padding: '5px 13px',
  display: 'inline-block',
  textAlign: 'center',
  boxShadow: 'none',
  margin: '0 auto',
});

// Стили для иконки @ (person icon)
const PersonIconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '5px',
});

// Стили для таблицы лидеров
const LeaderboardRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 100px',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
  fontSize: '14px',
  border: '1px solid rgba(28, 57, 101, 0.6)',
  borderRadius: '9px 8px 8px 9px',
  height: '37px'
});

const TraderNameWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#0e2d5a',
  height: '-webkit-fill-available',
  borderRadius: '8px 0 0 8px',
  padding: '8px 12px',
});

const LeaderboardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 16px',
  marginBottom: '8px',
});

const LeaderValue = styled(Typography)({
  fontWeight: 500,
  fontFamily: 'Gilroy',
  fontSize: '14px',
  padding: '8px 12px',
  textAlign: 'center',
  flex: 1,
});

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('traders');

  // Данные таблицы для разных табов
  const tradersData = [
    { name: 'InvestSmart22', value: '12,345,678' },
    { name: 'ProfitHunter33', value: '10,111,000' },
    { name: 'WealthWizard99', value: '9,876,543' },
    { name: 'AlphaInvestor11', value: '8,999,999' },
    { name: 'TradeKing89', value: '8,230,561' },
    { name: 'FutureFinancier', value: '7,654,321' },
    { name: 'DividendDynamo', value: '6,789,012' },
    { name: 'MarketMaster77', value: '5,942,150' },
    { name: 'BullishTrader56', value: '4,321,987' },
    { name: 'StockSavant45', value: '3,987,652' },
    { name: 'PennyStockPro', value: '2,500,500' },
    { name: 'GainsGuru88', value: '1,234,567' },
  ];

  const referralsData = [
    { name: 'CryptoGuard12', value: '10,000,000k' },
    { name: 'SecureFuture33', value: '9,876,543k' },
    { name: 'RetailGenius18', value: '9,012,345k' },
    { name: 'AutoDrive99', value: '8,765,432k' },
    { name: 'HealthWave19', value: '7,890,123k' },
    { name: 'AeroTech22', value: '6,543,216k' },
    { name: 'EduSmart30', value: '5,678,910k' },
    { name: 'FoodChainX', value: '4,321,987k' },
    { name: 'TechNova21', value: '3,456,789k' },
    { name: 'FitnessFuture11', value: '3,210,987k' },
    { name: 'CleanEnergy14', value: '2,345,678k' },
    { name: 'TravelEase17', value: '1,987,654k' },
  ];

  const winrateData = [
    { name: 'CryptoHavenX', value: '92.3%' },
    { name: 'TrustBanker18', value: '91.1%' },
    { name: 'RiskAversePlus', value: '90.2%' },
    { name: 'ProfitPath6', value: '89.8%' },
    { name: 'FutureWealth99', value: '88.4%' },
    { name: 'StableInvestPro', value: '87.7%' },
    { name: 'SecureFunds23', value: '85.6%' },
    { name: 'FundSecure56', value: '84.4%' },
    { name: 'FinanceWizard12', value: '82.1%' },
    { name: 'WealthGuard5', value: '80.0%' },
    { name: 'InvestSmart4U', value: '78.9%' },
    { name: 'SafeNest27', value: '76.5%' },
  ];

  // Определяем активные данные на основе выбранного таба
  const activeData = useMemo(() => {
    switch (activeTab) {
      case 'traders':
        return tradersData;
      case 'referrals':
        return referralsData;
      case 'winrate':
        return winrateData;
      default:
        return tradersData;
    }
  }, [activeTab]);

  // Определяем заголовок правой колонки
  const rightColumnTitle = useMemo(() => {
    switch (activeTab) {
      case 'traders':
        return 'USDT';
      case 'referrals':
        return 'USDT';
      case 'winrate':
        return 'Winrate';
      default:
        return 'USDT';
    }
  }, [activeTab]);

  // Определяем заголовок страницы и сумму
  const getPageTitle = useMemo(() => {
    switch (activeTab) {
      case 'traders':
        return { title: 'Your Balance', value: '250,561 USDT' };
      case 'referrals':
        return { title: 'Your Friends PnL', value: '1,567,230 USDT' };
      case 'winrate':
        return { title: 'Your Winrate (25+ trades only)', value: '63.2%' };
      default:
        return { title: 'Your Balance', value: '250,561 USDT' };
    }
  }, [activeTab]);

  // Определяем цвет значения в зависимости от активного таба
  const getValueColor = useMemo(() => {
    switch (activeTab) {
      case 'traders':
        return '#B4F35A'; // зеленый
      case 'referrals':
        return '#ECC80C'; // желтый
      case 'winrate':
        return '#57FFFC'; // синий
      default:
        return '#B4F35A';
    }
  }, [activeTab]);

  return (
    <Page>
    <Box sx={{ p: 2 }}>
      {/* Блок баланса и сезона */}
      <Box sx={{
        textAlign: 'center',
        backgroundColor: 'rgba(11, 24, 45, 0.6)',
        borderRadius: '10px',
        mb: 2
      }}>
        <Typography variant="h2" sx={{ mb: 1, color: '#FFFFFF' }}>
          {getPageTitle.title}
        </Typography>
        <Typography variant="h4" sx={{
          mb: 2,
          color: getValueColor,
          fontSize: '24px',
          fontFamily: 'Gilroy'
        }}>
          {getPageTitle.value}
        </Typography>
        <SeasonBadge>
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
            Season 23: 1d 8h 24m left
          </Typography>
        </SeasonBadge>
      </Box>

      <Box sx={{ px: 2.5, mt: 2 }}>
        <Segmented segments={[
          {
            label: 'Top Traders',
            value: 'traders'
          },
          {
            label: 'Top Referrals',
            value: 'referrals'
          },
          {
            label: 'Top Winrate',
            value: 'winrate'
          },
        ]} activeValue={activeTab} onChange={setActiveTab} />
      </Box>

      {/* Таблица лидеров */}
      <Box sx={{ mt: 2 }}>
        <LeaderboardHeader>
          <Typography variant="subtitle1">
            Trader
          </Typography>
          <Typography variant="subtitle1">
            {rightColumnTitle}
          </Typography>
        </LeaderboardHeader>

        {activeData.map((item, index) => (
          <LeaderboardRow key={index}>
            <TraderNameWrapper>
              {activeTab === 'referrals' && (
                <PersonIconContainer>
                  <LuUsersRound />
                </PersonIconContainer>
              )}
              <Typography variant="h2" sx={{ color: '#FFFFFF' }}>
                {item.name}
              </Typography>
            </TraderNameWrapper>
            <LeaderValue sx={{ color: getValueColor }}>
              {item.value}
            </LeaderValue>
          </LeaderboardRow>
        ))}
      </Box>
    </Box>
    </Page>
  );
};
