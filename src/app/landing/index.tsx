import { Title, Text, Stack, Container, Button } from '@mantine/core';
import { useHistory } from 'react-router-dom';

export function LandingPage() {
  // useHistory gives us the router's navigation object.
  // history.push('/results') changes the URL without a full page reload.
  const history = useHistory();

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="md">
        <Title>Hotel Finder..</Title>
        <Text c="dimmed">Learning React the ui-hotelhybrid way</Text>

        <Button
          size="lg"
          mt="md"
          onClick={() => history.push('/results')}
        >
          Browse Hotels
        </Button>
      </Stack>
    </Container>
  );
}
