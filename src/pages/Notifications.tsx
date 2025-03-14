import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Tabs, Tab, styled } from '@mui/material';
import { Page } from '@/components/Page';
import NotificationItem from '@/components/UI/NotificationItem/NotificationItem';
import { useNotifications, Notification } from '@/hooks/useNotifications';

const ClearAllButton = styled(Button)(() => ({
    color: '#66B3FF',
    fontSize: '12px',
    padding: '4px 8px',
    minWidth: 'auto',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'rgba(102, 179, 255, 0.1)',
    },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiTabs-indicator': {
        backgroundColor: '#66B3FF',
    },
}));

const StyledTab = styled(Tab)(() => ({
    textTransform: 'none',
    color: '#67819B',
    fontSize: '14px',
    padding: '6px 12px',
    minWidth: 'auto',
    '&.Mui-selected': {
        color: '#66B3FF',
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`notifications-tabpanel-${index}`}
            aria-labelledby={`notifications-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

type NotificationCategory = 'all' | 'market' | 'analysis' | 'regulatory' | 'technical' | 'general';

export const Notifications: React.FC = () => {
    const {
        notifications,
        markAsRead,
        markAllAsRead,
        toggleLike
    } = useNotifications();

    const [tabValue, setTabValue] = useState<number>(0);
    const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(notifications);

    const categories: { value: NotificationCategory; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'market', label: 'Market' },
        { value: 'analysis', label: 'Analysis' },
        { value: 'regulatory', label: 'Regulatory' },
        { value: 'technical', label: 'Technical' }
    ];

    // Handle notification read when opened
    useEffect(() => {
        notifications.forEach(notification => {
            if (!notification.read) {
                markAsRead(notification.id);
            }
        });
    }, []);

    // Filter notifications when tab changes
    useEffect(() => {
        const categoryFilter = categories[tabValue].value;

        if (categoryFilter === 'all') {
            setFilteredNotifications(notifications);
        } else {
            setFilteredNotifications(
                notifications.filter(notification => notification.category === categoryFilter)
            );
        }
    }, [tabValue, notifications]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleLike = (id: string) => {
        toggleLike(id);
    };

    return (
        <Page back={true}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2">Notifications</Typography>
                <ClearAllButton onClick={markAllAsRead}>
                    Mark as read
                </ClearAllButton>
            </Box>

            <StyledTabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {categories.map((category, index) => (
                    <StyledTab key={category.value} label={category.label} id={`notifications-tab-${index}`} />
                ))}
            </StyledTabs>

            {categories.map((category, index) => (
                <TabPanel key={category.value} value={tabValue} index={index}>
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                id={notification.id}
                                text={notification.text}
                                timestamp={notification.timestamp}
                                liked={notification.liked}
                                onLike={handleLike}
                            />
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="body1" sx={{ color: '#67819B' }}>
                                Нет уведомлений в этой категории
                            </Typography>
                        </Box>
                    )}
                </TabPanel>
            ))}
        </Page>
    );
};
