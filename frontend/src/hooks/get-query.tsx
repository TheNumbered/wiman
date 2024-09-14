import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { useGlobal } from './global-provider';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

<<<<<<< HEAD
export const useGetQuery = <T,>({
  resource,
  baseURL,
  bearerToken,
}: {
=======
interface QueryOptions {
>>>>>>> 71525938d0135bf94f0922f8b4d147a80aa72480
  resource: string;
  baseURL?: string;
  bearerToken?: string;
}

export const useGetQuery = <T,>({ resource, baseURL, bearerToken }: QueryOptions) => {
  const { getToken } = useAuth();
  const { showToast } = useGlobal();

  const baseUrlToUse = baseURL || ourApiBaseUrl;

  return useQuery<T>({
    queryKey: [resource],
    queryFn: async () =>
      fetch(`${baseUrlToUse}/${resource}`, {
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
        },
      }).then((response) => {
        if (!response.ok) {
          showToast('Failed to fetch data', 'error');
          throw new Error('Failed to fetch data');
        }
        return response.json();
      }),
  });
};
