import { useState, useCallback } from 'react';

export interface Notification {
    id: string;
    text: string;
    timestamp: string;
    read: boolean;
    liked?: boolean;
    category: 'market' | 'analysis' | 'regulatory' | 'technical' | 'general';
}

// Mock data for notifications
const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        text: 'AI analysis alignment: On-chain metrics, news sentiment, and indicators all confirm a strong bullish signal. Long probability for Bitcoin exceeds 80%.',
        timestamp: '2 hours ago',
        read: false,
        category: 'analysis'
    },
    {
        id: '2',
        text: 'Market outlook: Ethereum shows potential for growth driven by DeFi developments and network upgrades. Analysts predict a 70% chance of price increase.',
        timestamp: '3 hours ago',
        read: false,
        category: 'market'
    },
    {
        id: '3',
        text: 'Investor sentiment: Retail interest in altcoins is rising, with Cardano and Solana gaining traction. Surveys indicate 65% of investors plan to diversify.',
        timestamp: '5 hours ago',
        read: false,
        category: 'general'
    },
    {
        id: '4',
        text: 'Regulatory developments: New frameworks in Europe may provide clearer guidelines for crypto exchanges, potentially boosting institutional confidence.',
        timestamp: '7 hours ago',
        read: false,
        category: 'regulatory'
    },
    {
        id: '5',
        text: 'Technical analysis: Resistance levels for Bitcoin are observed at $35,000, while support holds strong around $30,000, indicating a possible consolidation phase.',
        timestamp: '8 hours ago',
        read: false,
        category: 'technical'
    },
    {
        id: '6',
        text: 'Market Alert: Bitcoin just broke above the $36,000 resistance level with strong volume, suggesting potential for further upside movement.',
        timestamp: '10 hours ago',
        read: true,
        category: 'market'
    },
    {
        id: '7',
        text: 'AI analysis update: Sentiment analysis of recent news shows 78% positive coverage for Ethereum, potentially signaling increasing mainstream adoption.',
        timestamp: '12 hours ago',
        read: true,
        category: 'analysis'
    }
];

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    // Get unread notifications count
    const unreadCount = notifications.filter(notification => !notification.read).length;

    // Mark notification as read
    const markAsRead = useCallback((id: string) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(() => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({ ...notification, read: true }))
        );
    }, []);

    // Toggle like on notification
    const toggleLike = useCallback((id: string) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id
                    ? {
                        ...notification,
                        liked: !notification.liked
                    }
                    : notification
            )
        );
    }, []);

    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        toggleLike
    };
};
