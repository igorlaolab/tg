// src/pages/Home.tsx
import React from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';
import adImage from '../../assets/images/ad_img.svg';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import PositionsBlock from '@/components/UI/PositionsBlock/PositionsBlock';
import { Page } from '@/components/Page';
import UserProfileCard from "@/components/UI/UserProfileCard/UserProfileCard.tsx";
import { useUserPhoto } from '@/hooks/useUserPhoto';
import NotificationIcon from '@/components/UI/NotificationIcon/NotificationIcon';
import { useNotifications } from '@/hooks/useNotifications';

const NewsItem = styled(Paper)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 60px',
  marginBottom: theme.spacing(1),
  backgroundColor: 'transparent',
  borderRadius: '10px',
  boxShadow: 'none',
  overflow: 'hidden',
}));

const NewsContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: '#fff',
  backgroundColor: '#152339',
}));

const AiRateBox = styled(Box)<{ isBearish: boolean }>(({ isBearish }) => ({
  backgroundColor: isBearish ? 'rgba(255, 77, 79, 15%)' : 'rgba(152, 227, 94, 15%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  color: isBearish ? '#FF4D4F' : '#98E35E',
}));

export const Home: React.FC = () => {
  const avatarUrl = useUserPhoto();
  const { unreadCount } = useNotifications();

  const positions = [
    {
      symbol: 'BTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 105170.88,
      currentPrice: 108234,
      pnl: 11.2,
      isProfit: false
    },
    {
      symbol: 'BTC',
      date: 'Jun 12, 2025 13:45',
      entryPrice: 105170.88,
      currentPrice: 108234.10,
      pnl: 11.2,
      isProfit: true
    }
  ];

  return (
    <Page back={false}>
      <Box sx={{ position: 'relative' }}>
        {/* Notification Icon */}
        <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
          <NotificationIcon count={unreadCount} />
        </Box>

        <Box sx={{ px: 1.5 }}>
          <UserProfileCard
            avatarUrl={avatarUrl}
            stats={{
              winrate: '76%',
              balance: '100,560.00 USDT',
              friends: '16'
            }}
          />
        </Box>

        {/* Новости с AI Rate */}
        <Box sx={{ mt: '20px', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h2">Top News</Typography>
            <Typography variant="h2">AI Rate</Typography>
          </Box>

          <NewsItem>
            <NewsContent>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '11px' }}>
                Ripple (XRP) surpassed $1 this November, reaching $1.20 on the 14th, gaining attention for its cross-border payment innovations.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#66B3FF' }}>XRP</Typography>
                <Typography variant="caption" sx={{ color: '#67819B' }}>11/29/2024, 10:10 AM, Google Finance</Typography>
              </Box>
            </NewsContent>
            <AiRateBox isBearish={false}>
              <Typography variant="caption">Bullish</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">42%
                  <Box component="span" sx={{ ml: 0.5 }}>
                    <FaArrowTrendUp />
                  </Box>
                </Typography>
              </Box>
            </AiRateBox>
          </NewsItem>

          <NewsItem>
            <NewsContent>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '11px' }}>
                Solana (SOL) climbed past $200 this November, setting a new high of $215 on the 14th, praised for its fast transactions.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#66B3FF' }}>SOL</Typography>
                <Typography variant="caption" sx={{ color: '#67819B' }}>11/29/2024, 10:10 AM, CNBC</Typography>
              </Box>
            </NewsContent>
            <AiRateBox isBearish={true}>
              <Typography variant="caption">Bullish</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">42%
                  <Box component="span" sx={{ ml: 0.5 }}>
                    <FaArrowTrendDown />
                  </Box>
                </Typography>
              </Box>
            </AiRateBox>
          </NewsItem>

          <NewsItem>
            <NewsContent>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '11px' }}>
                Ethereum (ETH) rose above $3,000 this November, reaching $3,250 on the 14th, driven by excitement over upcoming upgrades.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#66B3FF' }}>ETH</Typography>
                <Typography variant="caption" sx={{ color: '#67819B' }}>11/29/2024, 10:10 AM, MarketWatch</Typography>
              </Box>
            </NewsContent>
            <AiRateBox isBearish={false}>
              <Typography variant="caption">Bullish</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">42%
                  <Box component="span" sx={{ ml: 0.5 }}>
                    <FaArrowTrendUp />
                  </Box>
                </Typography>
              </Box>
            </AiRateBox>
          </NewsItem>
        </Box>

        {/* Позиции */}
        <PositionsBlock positions={positions} />

        {/* Баннер */}
        <Box sx={{
          mt: 3,
          mb: 3,
          borderRadius: '10px',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          <img
            src={adImage}
            alt="Banner"
            style={{
              width: '100%',
              borderRadius: '10px'
            }}
          />
        </Box>
      </Box>
    </Page>
  );
};
