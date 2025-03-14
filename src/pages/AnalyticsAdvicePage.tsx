import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, styled, Avatar, Divider } from '@mui/material';
import { FaArrowLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Page } from '@/components/Page';

const AdviceCard = styled(Box)({
    backgroundColor: 'rgba(29, 56, 95, 0.6)',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '12px',
});

const AdviceHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
});

const CoinInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const CoinName = styled(Typography)({
    fontSize: '18px',
    fontWeight: 500,
    color: '#fff',
});

const TimestampText = styled(Typography)({
    fontSize: '12px',
    color: '#67819B',
});

interface PredictionValueProps {
    isPositive: boolean;
}

const PredictionValue = styled(Typography)(({ isPositive }: PredictionValueProps) => ({
    display: 'flex',
    alignItems: 'center',
    color: isPositive ? '#98E35E' : '#FF4D4F',
    fontSize: '14px',
    fontWeight: 500,
}));

const CategoryTag = styled(Box)({
    backgroundColor: 'rgba(152, 227, 94, 0.15)',
    color: '#98E35E',
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '4px',
    display: 'inline-flex',
    marginRight: '6px',
    marginBottom: '6px',
});

const AdviceContent = styled(Typography)({
    fontSize: '14px',
    color: '#fff',
    marginTop: '10px',
    lineHeight: '1.5',
});

const MetricsContainer = styled(Box)({
    display: 'flex',
    gap: '12px',
    marginTop: '12px',
});

const MetricItem = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

const MetricLabel = styled(Typography)({
    fontSize: '10px',
    color: '#67819B',
});

interface MetricValueProps {
    isPositive: boolean;
}

const MetricValue = styled(Typography)(({ isPositive }: MetricValueProps) => ({
    fontSize: '12px',
    color: isPositive ? '#98E35E' : '#FF4D4F',
    display: 'flex',
    alignItems: 'center',
}));

// Интерфейсы
interface AdviceData {
    symbol: string;
    coinName: string;
    timestamp: string;
    prediction: number;
    categories: string[];
    content: string;
    metrics: {
        sentiment: number;
        technical: number;
        fundamental: number;
        volume: number;
    };
}

export const AnalyticsAdvicePage: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();

    // Моковые данные для аналитических советов
    const mockAdvices: AdviceData[] = [
        {
            symbol: symbol || 'BTC',
            coinName: symbol ? symbol.toUpperCase() : 'Bitcoin',
            timestamp: '2h ago',
            prediction: 65,
            categories: ['Daily analysis', 'Technical'],
            content: "Bitcoin's price movement shows a bullish trend with a lot of accumulation near the current price levels. RSI indicator is moving into the overbought range, suggesting strong buying pressure.",
            metrics: {
                sentiment: 72,
                technical: 81,
                fundamental: 62,
                volume: 58
            }
        },
        {
            symbol: symbol || 'BTC',
            coinName: symbol ? symbol.toUpperCase() : 'Bitcoin',
            timestamp: '5h ago',
            prediction: -23,
            categories: ['News impact', 'Market sentiment'],
            content: 'Recent SEC announcements could impact market sentiment in the short term. Charts show a potential retracement to support levels before continuing the uptrend.',
            metrics: {
                sentiment: -32,
                technical: -15,
                fundamental: -12,
                volume: -38
            }
        },
        {
            symbol: 'ETH',
            coinName: 'Ethereum',
            timestamp: '12h ago',
            prediction: 78,
            categories: ['Smart Money', 'Whales'],
            content: 'Large ETH transfers from exchanges to private wallets suggest accumulation by institutional investors. This is typically a bullish sign for medium-term price action.',
            metrics: {
                sentiment: 68,
                technical: 72,
                fundamental: 85,
                volume: 62
            }
        },
        {
            symbol: 'SOL',
            coinName: 'Solana',
            timestamp: '1d ago',
            prediction: 42,
            categories: ['On-chain', 'Development'],
            content: 'Increased developer activity on Solana and growing TVL in DeFi protocols are positive fundamental indicators. Technical indicators show a potential breakout pattern forming.',
            metrics: {
                sentiment: 51,
                technical: 48,
                fundamental: 75,
                volume: 32
            }
        }
    ];

    // Фильтруем советы, если указан определенный символ
    const filteredAdvices = symbol && symbol !== 'all'
        ? mockAdvices.filter(advice => advice.symbol.toLowerCase() === symbol.toLowerCase())
        : mockAdvices;

    return (
        <Page>
            <Box>
                <Typography variant="h2" sx={{ mb: 1, mt: 2 }}>AI Analytics Advice</Typography>
                {filteredAdvices.map((advice, index) => (
                    <AdviceCard key={index}>
                        <AdviceHeader>
                            <CoinInfo>
                                <Avatar
                                    src={`https://cryptologos.cc/logos/${advice.symbol.toLowerCase()}-${advice.symbol.toLowerCase()}-logo.png`}
                                    sx={{ width: 24, height: 24, backgroundColor: '#122a4b' }}
                                />
                                <CoinName>{advice.coinName}</CoinName>
                            </CoinInfo>
                            <Box sx={{ textAlign: 'right' }}>
                                <TimestampText>{advice.timestamp}</TimestampText>
                                <PredictionValue isPositive={advice.prediction > 0}>
                                    {advice.prediction > 0 ? '+' : ''}{advice.prediction}%
                                    {advice.prediction > 0
                                        ? <FaArrowUp style={{ marginLeft: 4 }} />
                                        : <FaArrowDown style={{ marginLeft: 4 }} />}
                                </PredictionValue>
                            </Box>
                        </AdviceHeader>

                        <Box>
                            {advice.categories.map((category, idx) => (
                                <CategoryTag key={idx}>{category}</CategoryTag>
                            ))}
                        </Box>

                        <AdviceContent>
                            {advice.content}
                        </AdviceContent>

                        <Divider sx={{ my: 1.5, backgroundColor: 'rgba(255,255,255,0.1)' }} />

                        <MetricsContainer>
                            <MetricItem>
                                <MetricLabel>Market</MetricLabel>
                                <MetricValue isPositive={advice.metrics.sentiment > 0}>
                                    {advice.metrics.sentiment > 0 ? '+' : ''}{advice.metrics.sentiment}%
                                </MetricValue>
                            </MetricItem>
                            <MetricItem>
                                <MetricLabel>Technical</MetricLabel>
                                <MetricValue isPositive={advice.metrics.technical > 0}>
                                    {advice.metrics.technical > 0 ? '+' : ''}{advice.metrics.technical}%
                                </MetricValue>
                            </MetricItem>
                            <MetricItem>
                                <MetricLabel>Fundamental</MetricLabel>
                                <MetricValue isPositive={advice.metrics.fundamental > 0}>
                                    {advice.metrics.fundamental > 0 ? '+' : ''}{advice.metrics.fundamental}%
                                </MetricValue>
                            </MetricItem>
                            <MetricItem>
                                <MetricLabel>Volume</MetricLabel>
                                <MetricValue isPositive={advice.metrics.volume > 0}>
                                    {advice.metrics.volume > 0 ? '+' : ''}{advice.metrics.volume}%
                                </MetricValue>
                            </MetricItem>
                        </MetricsContainer>
                    </AdviceCard>
                ))}
            </Box>
        </Page>
    );
};

export default AnalyticsAdvicePage;
