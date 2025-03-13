import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import {Paper, BottomNavigationAction, BottomNavigation, styled, Box} from "@mui/material";
import { BiHomeAlt2 } from "react-icons/bi";
import { TbCoinBitcoin, TbUserBitcoin } from "react-icons/tb";
import { LuRocket } from "react-icons/lu";

const StyledBottomNav = styled(BottomNavigation)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#07192B',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});


export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  return(
    <Box sx={{paddingBottom: '56px'}}>
      {children}
    <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      <StyledBottomNav
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<BiHomeAlt2 />}
        />
        <BottomNavigationAction
          label="Trade"
          value="/trade"
          icon={<TbCoinBitcoin />}
        />
        <BottomNavigationAction
          label="Leaderboard"
          value="/leaderboard"
          icon={<LuRocket />}
        />
        <BottomNavigationAction
          label="Me"
          value="/me"
          icon={<TbUserBitcoin />}
        />
      </StyledBottomNav>
    </Paper>
    </Box>);
}
