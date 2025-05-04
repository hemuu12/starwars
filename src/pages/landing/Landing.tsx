import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/app.store";

const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return (
    <Container>
      <Center style={{ height:'80vh', flexDirection: "column" }}>
        <Stack justify='space-around' align="center">
          <Title ta={'center'} order={1} >Welcome to the Star Wars App</Title>
          <Text size="lg" ta={'center'} maw={500}>
            Explore your favorite Star Wars characters, starships, films, and much more. Get started by logging in!
          </Text>
          {!isAuthenticated ? (
            <Button size="md" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Button size="md" onClick={() => navigate("/resources")}>
              Go to Resource List
            </Button>
          )}
        </Stack>
      </Center>
    </Container>
  );
};

export default LandingPage;
