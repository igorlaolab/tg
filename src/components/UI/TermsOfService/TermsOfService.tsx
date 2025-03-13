import { Box, styled } from '@mui/material';

const TermsContainer = styled(Box)({
    position: 'fixed',
    bottom: '55px',
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: '8px 0',
    backgroundColor: 'rgba(12, 24, 42, 0.9)',
    backdropFilter: 'blur(5px)',
    zIndex: 10,
    pointerEvents: 'none',
});

const TermsLink = styled('a')({
    color: '#67819B',
    cursor: 'pointer',
    fontSize: '12px',
    textDecoration: 'none',
    pointerEvents: 'auto',
    '&:hover': {
        textDecoration: 'underline',
    }
});

const TermsOfService = () => (
    <TermsContainer>
        <TermsLink href="/terms" target="_blank">
            Terms of Service
        </TermsLink>
    </TermsContainer>
);

export default TermsOfService; 