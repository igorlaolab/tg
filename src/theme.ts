import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    h2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#fff',
    },
    subtitle1: {
      fontSize: '12px',
      color: '#fff',
      fontWeight: 500,
    },
    body2: {
      fontSize: '11px',
    },
    caption: {
      fontSize: '10px',
      fontWeight: 500
    }
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderTop: 'none !important',
          backgroundColor: '#1A1D1F',
          '&.MuiPaper-root': {
            borderTop: 'none'
          },
          '&.MuiBottomNavigation-root': {
            borderTop: 'none'
          }
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          maxWidth: '120px',
          minWidth: '60px',
          color: '#67819B',
          paddingTop: 0,
          position: 'relative',
          '&.Mui-selected': {
            color: '#fff',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '2px',
              backgroundColor: '#1A91FD',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '2px',
            backgroundColor: '#1A91FD',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '10px',
            opacity: 1,
            transition: 'none',
          },
          '& .MuiBottomNavigationAction-label.Mui-selected': {
            fontSize: '10px'
          }
        }
      }
    }
  }
});
