import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';

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

  return <>
    {children}
    {/*<Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>*/}
    {/*  <StyledBottomNav*/}
    {/*    value={location.pathname}*/}
    {/*    onChange={(_, newValue) => navigate(newValue)}*/}
    {/*  >*/}
    {/*    <BottomNavigationAction*/}
    {/*      label="Home"*/}
    {/*      value="/"*/}
    {/*      icon={<FaArrowTrendUp />}*/}
    {/*    />*/}
    {/*    <BottomNavigationAction*/}
    {/*      label="Trade"*/}
    {/*      value="/trade"*/}
    {/*      icon={<FaArrowTrendUp />}*/}
    {/*    />*/}
    {/*    <BottomNavigationAction*/}
    {/*      label="Leaderboard"*/}
    {/*      value="/leaderboard"*/}
    {/*      icon={<FaArrowTrendUp />}*/}
    {/*    />*/}
    {/*    <BottomNavigationAction*/}
    {/*      label="Me"*/}
    {/*      value="/me"*/}
    {/*      icon={<FaArrowTrendUp />}*/}
    {/*    />*/}
    {/*  </StyledBottomNav>*/}
    {/*</Paper>*/}
  </>;
}
