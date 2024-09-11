import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

export const useGetQuery = ({
  resource,
  baseURL,
  bearerToken,
}: {
  resource: string;
  baseURL?: string;
  bearerToken?: string;
}) => {
  const { getToken } = useAuth();

  const baseUrlToUse = baseURL || ourApiBaseUrl;

  return useQuery({
    queryKey: [resource],
    queryFn: async () =>
      fetch(`${baseUrlToUse}/${resource}`, {
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      }),
  });
};