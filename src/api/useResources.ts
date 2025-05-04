import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLaunches = async ({ pageParam = 0 }) => {
  const limit = 12;
  const response = await axios.post('https://api.spacexdata.com/v4/launches/query', {
    query: {},
    options: {
      limit,
      page: pageParam + 1, // SpaceX API pages are 1-indexed
      sort: { date_utc: 'desc' },
    },
  });

  return {
    launches: response.data.docs,
    nextPage: pageParam + 1,
    hasNextPage: pageParam + 1 < response.data.totalPages,
  };
};


const fetchLaunchById = async (id: string) => {
  const response = await axios.get(`https://api.spacexdata.com/v4/launches/${id}`);
  return response.data;
};

// Custom hook to fetch resource by ID
export const useResourceById = (id: string) => {
  return useQuery({
    queryKey: ['spacex-launch', id],
    queryFn: () => fetchLaunchById(id),
  });
};


export const useResources = () => {
  return useInfiniteQuery({
    queryKey: ['spacex-launches'],
    queryFn: fetchLaunches,
    initialPageParam: 0, // ✅ This is the fix
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
};
