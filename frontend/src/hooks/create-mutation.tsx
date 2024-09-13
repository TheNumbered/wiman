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

  // Determine if we should include the Content-Type header
  const shouldSetContentType = contentType && contentType !== 'FormData';

  return useMutation({
    mutationFn: async (variables: Record<string, any>) => {
      // Marking the function as async allows us to use await here
      const token = await getToken();

      // Set headers conditionally based on the content type
      const headers = {
        Authorization: `Bearer ${bearerToken || token}`,
        ...(shouldSetContentType && { 'Content-Type': contentType }),
      };

      // Conditionally stringify body if contentType is JSON, otherwise send raw variables
      const body = contentType === 'application/json' ? JSON.stringify(variables) : variables;

      // @ts-ignore: Body can either be string or FormData
      return fetch(`${baseUrlToUse}/${resource}`, {
        method: 'POST',
        // Only set headers if necessary
        headers: shouldSetContentType ? headers : { Authorization: headers.Authorization },
        // @ts-ignore: Ignore body type mismatch
        body,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create resource');
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
