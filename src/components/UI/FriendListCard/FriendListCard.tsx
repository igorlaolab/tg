import React from 'react';
import { Box, Typography, styled } from '@mui/material';

// Types
interface FriendData {
    name: string;
    pnl: string;
}

interface FriendListCardProps {
    friends: FriendData[];
}

// Styled components
const HeaderRow = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px',
    marginBottom: '8px',
    width: '100%'
});

const FriendRow = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: '8px',
    fontSize: '14px',
    border: '1px solid rgba(28, 57, 101, 0.6)',
    borderRadius: '9px 8px 8px 9px',
    height: '36px',
    width: '100%',
    overflow: 'hidden'
});

const FriendNameWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0e2d5a',
    borderRadius: '8px 0 0 8px',
    padding: '8px 12px',
    height: 'auto',
    minHeight: '100%',
    width: '70%',
    boxSizing: 'border-box'
});

const FriendPnL = styled(Typography)({
    fontWeight: 500,
    fontFamily: 'Gilroy',
    fontSize: '14px',
    padding: '8px 12px',
    textAlign: 'center',
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    minHeight: '100%',
    boxSizing: 'border-box',
    color: '#B4F35A',
});

const FriendListCard: React.FC<FriendListCardProps> = ({ friends }) => {
    return (
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
    );
};

export default FriendListCard; 