import React from 'react';
import { Badge, IconButton, styled, Box } from '@mui/material';
import { PiBellSimple } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

interface NotificationIconProps {
    count: number;
}

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 2,
        backgroundColor: 'rgba(255, 77, 79, 1)',
        color: 'white',
        fontSize: '10px',
        padding: '0 4px',
        minWidth: '18px',
        height: '18px',
        borderRadius: '9px',
    },
}));

const CircleContainer = styled(Box)({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const NotificationIcon: React.FC<NotificationIconProps> = ({ count }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/notifications');
    };

    return (
        <IconButton
            onClick={handleClick}
            sx={{
                color: 'white',
                padding: '8px'
            }}
        >
            <StyledBadge badgeContent={count > 99 ? '99+' : count} max={99}>
                <CircleContainer>
                    <PiBellSimple size={18} />
                </CircleContainer>
            </StyledBadge>
        </IconButton>
    );
};

export default NotificationIcon;
