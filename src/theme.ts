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
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          maxWidth: '120px',
          minWidth: '60px',
          color: '#67819B',
          '&.Mui-selected': {
            color: '#fff'
          }
        }
      }
    }
  }
});
