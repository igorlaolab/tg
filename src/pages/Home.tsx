// src/pages/Home.tsx
import React from 'react';
import { Box, Avatar, Typography, Paper, styled, Grid } from '@mui/material';
import adImage from '../../assets/images/ad_img.svg';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import PositionsBlock from '@/components/UI/PositionsBlock/PositionsBlock';
import { Page } from '@/components/Page';

const StatsBlock = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: '16px',
  marginBottom: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 15%)',
  border: '1px solid rgba(255, 255, 255, 9%)',
  borderRadius: '10px',
  boxShadow: 'none',
  textAlign: 'center',
  margin: '0 auto',
}));

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

const StatCaption = styled(Typography)({
  color: '#A1BDD9',
  fontSize: '12px',
  fontFamily: 'Noto Sans',
  fontWeight: 400
});

const StatValue = styled(Typography)({
  color: '#ECC80C',
  fontSize: '15px',
  fontFamily: 'Gilroy',
  fontWeight: 600,
});

export const Home: React.FC = () => {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;

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
    <Page>
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={avatarUrl}
            sx={{ width: 64, height: 64 }}
          />
        </Box>
        <StatsBlock>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <StatValue>65%</StatValue>
              <StatCaption>Winrate</StatCaption>
            </Grid>
            <Grid item xs={6}>
              <StatValue>100,561.23 USDT</StatValue>
              <StatCaption>Balance</StatCaption>
            </Grid>
            <Grid item xs={3}>
              <StatValue>42</StatValue>
              <StatCaption>Friends</StatCaption>
            </Grid>
          </Grid>
        </StatsBlock>

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
    </Box>
    </Page>
  );
};
