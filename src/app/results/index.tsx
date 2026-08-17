import { useQuery } from '@tanstack/react-query';
import { Container, Title, Text, Stack, Card, Loader, Alert, Badge, Group } from '@mantine/core';

// ─── Step 1: Define the shape of the data coming from the server ────────────
// This TypeScript type must match exactly what Express sends back in its JSON.
// If they ever get out of sync, TypeScript will warn us.
type Hotel = {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  description: string;
};

// ─── Step 2: The fetch function ─────────────────────────────────────────────
// This is a plain async function — nothing React-specific.
// It calls the Express server and returns parsed JSON.
// React Query will call this function for us.
async function fetchHotels(): Promise<Hotel[]> {
  const response = await fetch('/api/hotels');

  // fetch() does NOT throw on error status codes like 404 or 500.
  // We must check response.ok ourselves and throw manually.
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  // .json() reads the response body and parses it from a JSON string
  // into a JavaScript object/array
  return response.json() as Promise<Hotel[]>;
}

// ─── Step 3: The React component ─────────────────────────────────────────────
export function ResultsPage() {
  // useQuery does three things simultaneously:
  //   1. Calls fetchHotels() the first time this component renders
  //   2. Tracks the loading / error / success state for us
  //   3. Caches the result — if you navigate away and come back,
  //      the cached data shows instantly while a background refetch happens
  const { data: hotels, isLoading, isError, error } = useQuery({
    queryKey: ['hotels'], // a unique cache key for this query
    queryFn: fetchHotels, // the function to call
  });

  // ── Render: Loading state ────────────────────────────────────────────────
  // While the fetch is in-flight, isLoading is true.
  // React renders this and stops — it does not execute the rest of the function.
  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Loader />
        <Text mt="md" c="dimmed">Loading hotels from server...</Text>
      </Container>
    );
  }

  // ── Render: Error state ───────────────────────────────────────────────────
  // If fetchHotels() threw an error, isError is true and error holds it.
  if (isError) {
    return (
      <Container size="md" py="xl">
        <Alert color="red" title="Failed to load hotels">
          {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      </Container>
    );
  }

  // ── Render: Success state ─────────────────────────────────────────────────
  // When data arrives, React re-renders this component.
  // 'hotels' is now the Hotel[] array the server sent.
  return (
    <Container size="md" py="xl">
      <Title mb="md">Available Hotels</Title>
      <Text c="dimmed" mb="lg">
        {hotels?.length} hotels loaded from Express server
      </Text>

      <Stack gap="md">
        {hotels?.map(hotel => (
          // key={hotel.id} is required by React when rendering a list.
          // React uses it to track which item is which when the list changes.
          <Card key={hotel.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={700} size="lg">{hotel.name}</Text>
              <Badge color="blue">{hotel.city}</Badge>
            </Group>

            <Text size="sm" c="dimmed" mb="xs">{hotel.description}</Text>

            <Group gap="xl" mt="md">
              <Text fw={600}>${hotel.price} / night</Text>
              <Text c="yellow.7" fw={600}>★ {hotel.rating}</Text>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
