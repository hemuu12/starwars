import { useState } from 'react'
import { useAppStore } from '../store/app.store';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Paper,  Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const Login = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const login = useAppStore(state => state.login);
    const navigate = useNavigate();

    const handleLogin = () => {
        if(login(username)) {
            navigate("/resources");
            notifications.show({
              message: 'Login Successful',
              autoClose: 3000,
            })
        } else {
            setError("Invalid username");
            notifications.show({
              message: 'There is a problem while logging in!',
              autoClose: 3000,
              color: 'red',
            })
        }
    };

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
      Try "AdminTesting" for username to login
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput radius="xs" label="Username" placeholder="Enter Your Username" required value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
        {error && <Text style={{color: 'red', fontSize: 16}} mt='sm'>{error}</Text>}
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  )
}

export default Login