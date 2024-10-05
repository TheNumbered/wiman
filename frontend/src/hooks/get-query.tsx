import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { useGlobal } from './global-provider';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

interface QueryOptions {
  resource: string;
  baseURL?: string;
  bearerToken?: string;
  queryKey?: string;
}

export const useGetQuery = <T,>({ resource, baseURL, bearerToken, queryKey }: QueryOptions) => {
  const { getToken } = useAuth();
  const { showToast } = useGlobal();

  const baseUrlToUse = baseURL || ourApiBaseUrl;

  return useQuery<T>({
    queryKey: [queryKey || resource],
    queryFn: async () =>
      fetch(`${baseUrlToUse}/${resource}`, {
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
        },
      }).then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            showToast('Unauthorized', 'error');
          }
          throw new Error('Failed to fetch data');
        }
        return response.json();
      }),
  });
};
