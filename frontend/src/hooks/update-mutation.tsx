import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

export const useUpdateMutation = ({
  resource,
  invalidateKeys,
  contentType,
  baseUrl,
  bearerToken,
}: {
  resource: string;
  baseUrl?: string;
  invalidateKeys?: string[];
  contentType?: string;
  bearerToken?: string;
}) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const baseUrlToUse = baseUrl || ourApiBaseUrl;

  contentType = contentType || 'application/json';
  const ContentType = contentType === 'empty' ? {} : { 'Content-Type': contentType };

  return useMutation({
    //@ts-ignore
    mutationFn: async (variables: { id: string | number; data: Record<string, any> }) => {
      const { id, data } = variables;
      // @ts-ignore
      return fetch(`${baseUrlToUse}/${resource}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
          ...ContentType,
        },
        body: contentType === 'application/json' ? JSON.stringify(data) : data,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update resource');
        }
        return response.json();
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
};
