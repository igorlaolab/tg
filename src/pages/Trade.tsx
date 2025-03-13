import React from 'react';
import { Box, Typography, styled, Avatar } from '@mui/material';
import { FaArrowTrendUp, FaArrowTrendDown, FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import TermsOfService from '@/components/UI/TermsOfService/TermsOfService';
import { Page } from '@/components/Page';

// Интерфейс для данных криптовалюты
interface CryptoSymbol {
  id: string;
  name: string;
  icon: string; // URL иконки или компонент
  prediction: 'Bullish' | 'Bearish';
  percentage: number;
}

// Контейнер для строки криптовалюты
const SymbolRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 100px',
  marginBottom: '8px',
  fontSize: '14px',
  borderRadius: '10px',
  overflow: 'hidden',
});

// Левая часть строки с информацией о валюте - сделана кликабельной
const SymbolInfo = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#122a4b',
  padding: '12px',
  borderRadius: '10px 0 0 10px',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: '#1a3a65',
  },
  '&:active': {
    backgroundColor: '#0e2d5a',
  }
});

// Блок с названием и иконкой валюты
const SymbolName = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

// Правая часть с AI Rate
const AiRateBox = styled(Box)<{ isBearish: boolean }>(({ isBearish }) => ({
  backgroundColor: isBearish ? 'rgba(87, 22, 22, 0.6)' : 'rgba(22, 87, 36, 0.6)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  color: isBearish ? '#FF4D4F' : '#98E35E',
}));

// Заголовки страницы
const HeaderRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 16px 8px 16px',
});

export const Trade: React.FC = () => {
  // Моковые данные криптовалют
  const cryptoSymbols: CryptoSymbol[] = [
    {
      id: 'btc',
      name: 'Bitcoin',
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      prediction: 'Bullish',
      percentage: 42
    },
    {
      id: 'eth',
      name: 'Ethereum',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      prediction: 'Bearish',
      percentage: 13
    },
    {
      id: 'sol',
      name: 'Solana',
      icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      prediction: 'Bullish',
      percentage: 24
    },
    {
      id: 'trump',
      name: 'Trump',
      icon: 'https://i.imgur.com/RVB2rOj.jpg', // Замените на корректную ссылку
      prediction: 'Bullish',
      percentage: 18
    }
  ];

  return (
    <Page back={false}>
    <Box sx={{ p: 2, pb: '60px' }}>
      {/* Заголовки */}
      <HeaderRow>
        <Typography variant="h2">Symbols</Typography>
        <Typography variant="h2">AI Rate</Typography>
      </HeaderRow>

      {/* Список криптовалют */}
      {cryptoSymbols.map((symbol) => (
        <SymbolRow key={symbol.id}>
          <SymbolInfo
            to={`/trade/${symbol.id}`}
            aria-label={`View details for ${symbol.name}`}
          >
            <SymbolName>
              <Avatar
                src={symbol.icon}
                alt={symbol.name}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="h2">{symbol.name}</Typography>
            </SymbolName>
            <Typography component="span" sx={{ color: '#67819B' }}>
            <FaChevronRight />
            </Typography>
          </SymbolInfo>
          <AiRateBox isBearish={symbol.prediction === 'Bearish'}>
            <Typography variant="caption">{symbol.prediction}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">{symbol.percentage}%</Typography>
              <Box component="span" sx={{ ml: 0.5 }}>
                {symbol.prediction === 'Bullish' ?
                  <FaArrowTrendUp /> :
                  <FaArrowTrendDown />
                }
              </Box>
            </Box>
          </AiRateBox>
        </SymbolRow>
      ))}

      <TermsOfService />
    </Box>
    </Page>
  );
};
