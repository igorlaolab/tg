import React from 'react';
import { Box, styled } from '@mui/material';
import Segmented from '@/components/UI/Segmented/Segmented';

const TabsContainer = styled(Box)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

interface TabOption {
    label: string;
    value: string;
}

interface TabPanelProps {
    tabs: TabOption[];
    activeTab: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
    tabs,
    activeTab,
    onChange,
    children
}) => {
    return (
        <Box>
            <Box sx={{px: 2}}>
              <TabsContainer>
                <Segmented
                  segments={tabs}
                  activeValue={activeTab}
                  onChange={onChange}
                />
              </TabsContainer>
            </Box>
            <ContentContainer>
                {children}
            </ContentContainer>
        </Box>
    );
};

export default TabPanel;
