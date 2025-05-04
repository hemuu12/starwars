import { useState, useEffect, useRef } from 'react';
import {
  Container, Text, Button, Select, Group, TextInput,
  Grid, Card, Badge, Stack, Loader, Center
} from '@mantine/core';
import { useResources } from '../../api/useResources';
import { useNavigate } from 'react-router-dom';
import IntroSection from '../../components/IntroSection';
import ResourceListSkeleton from '../../components/ListSkeleton';

const ResourceListPage = () => {
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useResources();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allLaunches = data?.pages.flatMap((page) => page.launches) || [];

  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      const valueA = sortBy === 'name' ? a.name : new Date(a.date_utc).getTime();
      const valueB = sortBy === 'name' ? b.name : new Date(b.date_utc).getTime();

      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  };

  const filteredData = allLaunches.filter((launch: any) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedAndFilteredData = sortData(filteredData);

  if (isLoading) return <ResourceListSkeleton />;
  if (error) return <Text color="error.6">{(error as Error).message}</Text>;

  return (
    <>
      <IntroSection pageType="list" />
      <Container mt={20}>
        <Group mb="md" justify="space-between">
          <TextInput
            label="Search by mission name"
            placeholder="Typing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '300px' }}
            styles={{ input: { backgroundColor: 'neutral.0' } }}
          />

          <Select
            label="Sort by"
            value={sortBy}
            onChange={(value) => setSortBy(value as 'name' | 'date')}
            data={[
              { value: 'name', label: 'Name' },
              { value: 'date', label: 'Launch Date' },
            ]}
            style={{ width: '200px' }}
          />

          <Select
            label="Sort order"
            value={sortOrder}
            onChange={(value) => setSortOrder(value as 'asc' | 'desc')}
            data={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
            style={{ width: '200px' }}
          />
        </Group>

        <Grid gutter="md">
          {sortedAndFilteredData.length > 0 ? (
            sortedAndFilteredData.map((launch: any) => (
              <Grid.Col key={launch.id} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack spacing="xs">
                    <Text fw={700} color="primary.6">{launch.name}</Text>
                    <Badge
                      color={launch.success ? 'success.5' : 'error.5'}
                      variant="light"
                    >
                      {launch.success ? 'Success' : 'Failure'}
                    </Badge>
                    <Text size="sm" color="secondary.7">
                      Date: {new Date(launch.date_utc).toLocaleDateString()}
                    </Text>
                    <Button
                      mt="sm"
                      variant="light"
                      fullWidth
                      color="primary"
                      onClick={() => navigate(`/resources/${launch.id}`)}
                    >
                      View Details
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={12}>
              <Text fw={500} ta="center" color="neutral.6">
                No launches found
              </Text>
            </Grid.Col>
          )}
        </Grid>

        <Center ref={observerRef} my={30}>
          {isFetchingNextPage && <Loader color="primary" />}
        </Center>
      </Container>
    </>
  );
};

export default ResourceListPage;