import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppShell as MantineAppShell, Text, Group, Button, Burger } from '@mantine/core';
import { useAppStore } from '../store/app.store';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';


const AppShell = () => {
   const { pathname } = useLocation();

  useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
  const { isAuthenticated, logout } = useAppStore();
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
          <Text size="lg" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
               Star Wars App
            </Text>
            <Group gap={10}>
            <Group ml="xl" gap={10} visibleFrom="sm">
            {!isAuthenticated ? (
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
              ) : (
                <>
                  <Button variant="outline" color="red" onClick={() => {
                    logout();
                    notifications.show({
                      message: 'Logged Out Successfully',
                      autoClose: 3000,
                    })
                  }}>
                    Logout
                  </Button>
                </>
              )}
            </Group>
            </Group>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py="md" px={4}>
      {!isAuthenticated ? (
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
              ) : (
                <>
                  <Button variant="outline" color="red" onClick={() => {
                    logout();
                    notifications.show({
                      message: 'Logged Out Successfully',
                      autoClose: 3000,
                    })
                    }}>
                    Logout
                  </Button>
                </>
              )}
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
      <Outlet />
      </MantineAppShell.Main>
      
    </MantineAppShell>
   
  );
};

export default AppShell;
