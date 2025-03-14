import React from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
import { BiLike, BiDislike } from "react-icons/bi";

export interface NotificationItemProps {
    id: string;
    text: string;
    timestamp: string;
    liked?: boolean;
    disliked?: boolean;
    onLike?: (id: string) => void;
    onDislike?: (id: string) => void;
}

const NotificationContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    backgroundColor: '#152339',
    borderRadius: '10px',
    boxShadow: 'none',
    color: '#fff',
}));

const ActionButton = styled(Box)<{ active?: boolean }>(({ active }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
}));

const NotificationItem: React.FC<NotificationItemProps> = ({
    id,
    text,
    timestamp,
    liked = false,
    disliked = false,
    onLike,
    onDislike,
}) => {
    return (
        <NotificationContainer>
            <Typography variant="body2" sx={{ mb: 1 }}>
                {text}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#67819B' }}>
                    {timestamp}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <ActionButton
                        active={liked}
                        onClick={() => onLike && onLike(id)}
                    >
                        <BiLike size={20} color={liked ? '#98E35E' : '#67819B'} />
                    </ActionButton>

                    <ActionButton
                        active={disliked}
                        onClick={() => onDislike && onDislike(id)}
                    >
                        <BiDislike size={20} color={disliked ? '#FF4D4F' : '#67819B'} />
                    </ActionButton>
                </Box>
            </Box>
        </NotificationContainer>
    );
};

export default NotificationItem; 