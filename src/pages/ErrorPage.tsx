import { Container, Title, Text, Button, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Title order={1} style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        404
      </Title>
      <Text color="dimmed" size="lg" style={{ marginBottom: "1.5rem" }}>
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Center>
        <Button
          variant="outline"
          size="md"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Center>
    </Container>
  );
};

export default NotFoundPage;
