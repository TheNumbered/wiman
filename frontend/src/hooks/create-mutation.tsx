import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

export const useCreateMutation = ({
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
    mutationFn: async (variables: Record<string, any>) =>
      //@ts-ignore
      fetch(`${baseUrlToUse}/${resource}`, {
        method: 'POST',
        //@ts-ignore
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
          ...ContentType,
        },
        //@ts-ignore
        body: contentType === 'application/json' ? JSON.stringify(variables) : variables,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create resource');
        }
        return response.json();
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
};
