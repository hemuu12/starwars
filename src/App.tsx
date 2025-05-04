import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import { routes } from './routes';
import { Notifications } from '@mantine/notifications';

export default function App() {
	const router = createBrowserRouter(routes);
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<Notifications />
			<RouterProvider router={router} />
		</MantineProvider>
	);
}
