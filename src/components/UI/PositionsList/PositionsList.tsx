import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const PositionsContainer = styled(Box)({
    backgroundColor: 'rgba(29, 56, 95, 0.6)',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '16px',
});

interface Position {
    symbol: string;
    entryPrice: number;
    currentPrice: number;
    pnl: string;
    date: string;
}

interface PositionsListProps {
    positions: Position[];
}

const PositionRow = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const PositionsList: React.FC<PositionsListProps> = ({ positions }) => {
    return (
        <PositionsContainer>
            <Typography variant="h2" sx={{ mb: 2 }}>Your Positions</Typography>
            {positions.length > 0 ? (
                positions.map((position, index) => (
                    <PositionRow key={index}>
                        <Box>
                            <Typography variant="body2">{position.symbol}</Typography>
                            <Typography variant="caption" sx={{ color: '#67819B' }}>{position.date}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2">{position.pnl}</Typography>
                            <Typography variant="caption" sx={{ color: '#67819B' }}>
                                {position.currentPrice}
                            </Typography>
                        </Box>
                    </PositionRow>
                ))
            ) : (
                <Typography variant="body2" sx={{ color: '#67819B', textAlign: 'center' }}>
                    No open positions
                </Typography>
            )}
        </PositionsContainer>
    );
};

export default PositionsList; 