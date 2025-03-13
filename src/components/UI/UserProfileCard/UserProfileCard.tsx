import React from 'react';
import { Box, Avatar, Typography, styled } from '@mui/material';

const StatsCardContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: 'rgba(29, 56, 95, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.09)',
    borderRadius: '10px',
    boxShadow: 'none',
    textAlign: 'center',
    margin: '0 auto',
}));

const StatLabel = styled(Typography)({
    color: '#A1BDD9',
    fontSize: '12px',
    fontWeight: 400
});

const StatValue = styled(Typography)({
    fontFamily: 'Gilroy',
    color: '#ECC80C',
    fontSize: '15px',
    fontWeight: 600,
});

interface UserStatItemProps {
    value: string | number;
    label: string;
    xs?: number;
}

const UserStatItem: React.FC<UserStatItemProps> = ({ value, label, xs = 4 }) => (
    <Box sx={{ width: `${(xs / 12) * 100}%`, px: 1 }}>
        <StatValue>{value}</StatValue>
        <StatLabel>{label}</StatLabel>
    </Box>
);

interface UserProfileCardProps {
    avatarUrl: string;
    stats: {
        winrate: string;
        balance: string;
        friends: string | number;
    };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ avatarUrl, stats }) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                    src={avatarUrl}
                    sx={{ width: 64, height: 64 }}
                />
            </Box>
            <StatsCardContainer>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <UserStatItem value={stats.winrate} label="Winrate" xs={3} />
                    <UserStatItem value={stats.balance} label="Balance" xs={6} />
                    <UserStatItem value={stats.friends} label="Friends" xs={3} />
                </Box>
            </StatsCardContainer>
        </>
    );
};

export default UserProfileCard;
