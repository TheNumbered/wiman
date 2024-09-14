import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobal } from './global-provider';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

interface CreateMutationOptions {
  resource: string;
  baseUrl?: string;
  invalidateKeys?: string[];
  onSuccessMessage?: string;
  onSucessCallback?: () => void;
  contentType?: string;
  bearerToken?: string;
}

export const useCreateMutation = ({
  resource,
  invalidateKeys,
  contentType,
  baseUrl,
  bearerToken,
  onSuccessMessage,
  onSucessCallback,
}: CreateMutationOptions) => {
  const { getToken } = useAuth();
  const { showToast } = useGlobal();
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
          showToast('Failed to create resource', 'error');
          throw new Error('Failed to create resource');
        }
        return response.json();
      });
    },
    onSuccess: () => {
      if (onSuccessMessage) {
        showToast(onSuccessMessage, 'success');
      }
      if (onSucessCallback) {
        onSucessCallback();
      }
      queryClient.invalidateQueries({ queryKey: [resource] });
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
    onError: () => {
      showToast('Failed to create resource', 'error');
    },
  });
};
