import { Container, Skeleton, Group, Grid, Card, Stack, Center } from '@mantine/core';

const ResourceListSkeleton = () => {
  const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
    <Group key={index} justify='space-between' align="center" style={{ marginBottom: '1rem' }}>
      <Skeleton height={50} circle />
      <Skeleton height={20} width="20%" />
      <Skeleton height={20} width="20%" />
      <Skeleton height={20} width="20%" />
    </Group>
  ));

  return (
   <>
       <Container mt={20}>
         {/* Top Controls */}
         <Group mb="md" justify="space-between">
           <Skeleton height={38} width={300} />
           <Skeleton height={38} width={200} />
           <Skeleton height={38} width={200} />
         </Group>
   
         {/* Grid of cards */}
         <Grid gutter="md">
           {Array.from({ length: 6 }).map((_, idx) => (
             <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 4 }}>
               <Card shadow="sm" padding="lg" radius="md" withBorder>
                 <Stack spacing="xs">
                   <Skeleton height={20} width="60%" />
                   <Skeleton height={20} width="30%" />
                   <Skeleton height={16} width="50%" />
                   <Skeleton height={32} width="100%" />
                 </Stack>
               </Card>
             </Grid.Col>
           ))}
         </Grid>
   
         {/* Infinite loading */}
         <Center my={30}>
           <Skeleton height={36} width={36} radius="xl" />
         </Center>
       </Container>
     </>
  );
};

export default ResourceListSkeleton;
