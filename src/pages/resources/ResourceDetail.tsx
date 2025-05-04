import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Title, Text, Stack, Grid, Accordion, Avatar } from '@mantine/core';
import { useResourceById } from '../../api/useResources'; // Adjusted to use the resource by ID
import IntroSection from '../../components/IntroSection';
import ResourceDetailSkeleton from '../../components/DetailSkeleton';

const ResourceDetailPage = () => {
  const { id } = useParams(); // Get the resource ID from the URL params
  const { data, isLoading, error } = useResourceById(id!); // Using the hook to fetch data by ID

  // Show skeleton while loading
  if (isLoading) {
    return <ResourceDetailSkeleton />;
  }

  // Handle errors
  if (error) return <Text color="red">{(error as Error).message}</Text>;

  // Function to get Avatar URL
  const getAvatarUrl = (name: string) => {
    return `https://robohash.org/${encodeURIComponent(name)}?set=set1`;
  };
  console.log(data,"HIIIIIiiiiiiiii");
  

  return (
    <>
      <IntroSection pageType="detail" />
      <Container mt={20}>
        <Card shadow="sm" padding="lg">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
              <Avatar
                src={getAvatarUrl(data?.name || 'default')}
                size={180}
                radius="md"
                alt={`Avatar of ${data?.name}`}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 8 }}>
              <Title order={3}>{data?.name}</Title>
              <Stack>
                <Text>{data?.failures[0]?.reason}</Text>
              </Stack>
            </Grid.Col>

         

            {/* Starships Section */}
            <Grid.Col span={12} mt={20}>
              {data?.starships?.length > 0 ? (
                <Accordion>
                  {data.starships.map((starship, index) => (
                    <Accordion.Item key={index} value={`starship-${index}`}>
                      <Accordion.Control>{starship.name}</Accordion.Control>
                      <Accordion.Panel>
                        <Text>Model: {starship.model}</Text>
                        <Text>Manufacturer: {starship.manufacturer}</Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                <Text>No starships available.</Text>
              )}
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ResourceDetailPage;
